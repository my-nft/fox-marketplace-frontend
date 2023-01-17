import {
  AUTIONContractAddress,
  ERC20ContractAddress,
  FIXEDContractAddress,
  getCurrentWalletConnected,
  loadAFixedPriceContract,
  loadAuctionContract,
  loadERC20Contract,
  loadERC721Contract,
  loaderContract,
  loadFoxMasterCollectionContract,
  loadOfferSystemContract,
  OfferSystemAddress,
  web3Infura,
} from "../utils/blockchainInteractor";

import { sameAddress } from "../utils/walletUtils";

export const nftLoader = async (collectionAddress) => {
  const contract = await loaderContract();
  const connectWallet = await getCurrentWalletConnected();

  const tx = await contract.methods
    .getTokens(connectWallet, 1, 100, collectionAddress)
    .call();
};

export const ownerOf = async (collectionAddress, tokenID) => {
  const erc721Contract = await loadERC721Contract(collectionAddress, true);
  return await erc721Contract.methods.ownerOf(tokenID).call();
};

export const getPriceByListing = async (listingId) => {
  const fixedPriceContractReadOnly = await loadAFixedPriceContract(true);
  const listingPrice = await fixedPriceContractReadOnly.methods
    .getPriceByListing(listingId)
    .call();
  return listingPrice / 10 ** 18;
};

export const getBestOffer = async (collectionAddress, tokenID) => {
  const offerSystemContractReadOnly = await loadOfferSystemContract(true);
  const response = await offerSystemContractReadOnly.methods
    .activeBuyOffers(collectionAddress, tokenID)
    .call();
  return {
    price: Number(response.price) / 10 ** 18,
    offerOwner: response.buyer
  };
};

export const isActiveListing = async (listingId) => {
  const fixedPriceContractReadOnly = await loadAFixedPriceContract(true);
  const response = await fixedPriceContractReadOnly.methods
    .listings(listingId)
    .call();
  return response.active;
};

export const getListingIdByToken = async (collectionAddress, tokenID) => {
  const fixedPriceContractReadOnly = await loadAFixedPriceContract(true);
  const response = await fixedPriceContractReadOnly.methods
    .listingIdByToken(collectionAddress, tokenID)
    .call();

  const isListingActive = await isActiveListing(response);

  if (response && isListingActive) {
    return response;
  } else {
    return undefined;
  }
};

export const createAuction = async (
  collectionAddress,
  tokenID,
  initialPrice,
  endAuction
) => {
  const connectWallet = await getCurrentWalletConnected();
  const price = await bigNumberPricing(initialPrice);
  const erc721Contract = await loadERC721Contract(collectionAddress, false);
  const auctionContract = await loadAuctionContract();

  const isApproved = await erc721Contract.methods.getApproved(tokenID).call();

  if (!sameAddress(isApproved, AUTIONContractAddress)) {
    const gasLimitApprouve = await erc721Contract.methods
      .approve(AUTIONContractAddress, tokenID)
      .estimateGas({
        from: connectWallet,
        to: collectionAddress,
      });

    await erc721Contract.methods.approve(AUTIONContractAddress, tokenID).send({
      from: connectWallet,
      to: collectionAddress,
      gasLimit: gasLimitApprouve,
    });
  }

  const gasLimit = await auctionContract.methods
    .createAuction(
      collectionAddress,
      ERC20ContractAddress,
      tokenID,
      price,
      endAuction
    )
    .estimateGas({
      from: connectWallet,
      to: AUTIONContractAddress,
    });

  const tsx = await auctionContract.methods
    .createAuction(
      collectionAddress,
      ERC20ContractAddress,
      tokenID,
      price,
      endAuction
    )
    .send({
      from: connectWallet,
      to: AUTIONContractAddress,
      gasLimit,
    });

  const auctionId = await auctionContract.methods
    .auctionIdByToken(collectionAddress, tokenID)
    .call();

  return {
    auctionId,
    transactionId: tsx.transactionHash,
  };
};

export const getAuctionInfos = async (auctionId) => {
  try {
    const auctionContractReadOnly = await loadAuctionContract(true);

    return await auctionContractReadOnly.methods.allAuctions(auctionId).call();
  } catch (error) {}
};

export const placeBid = async (auctionId, bidValue) => {
  const erc20Contract = await loadERC20Contract();
  const connectWallet = await getCurrentWalletConnected();
  const bidValueTrans = await bigNumberPricing(bidValue);
  const auctionContract = await loadAuctionContract();

  const gasLimitApprouve = await erc20Contract.methods
    .approve(AUTIONContractAddress, bidValueTrans)
    .estimateGas({
      from: connectWallet,
      to: ERC20ContractAddress,
    });

  await erc20Contract.methods
    .approve(AUTIONContractAddress, bidValueTrans)
    .send({
      from: connectWallet,
      to: ERC20ContractAddress,
      gasLimit: gasLimitApprouve,
    });

  const gasLimitPlaceBid = await auctionContract.methods
    .bid(auctionId, bidValueTrans)
    .estimateGas({
      from: connectWallet,
      to: AUTIONContractAddress,
    });

  const tsx = await auctionContract.methods.bid(auctionId, bidValueTrans).send({
    from: connectWallet,
    to: AUTIONContractAddress,
    gasLimit: gasLimitPlaceBid,
  });

  return tsx.transactionHash;
};

export const refundNft = async (auctionId) => {
  const auctionContract = await loadAuctionContract();
  const connectWallet = await getCurrentWalletConnected();
  const gasLimit = await auctionContract.methods.refund(auctionId).estimateGas({
    from: connectWallet,
    to: AUTIONContractAddress,
  });
  const tsx = await auctionContract.methods.refund(auctionId).send({
    from: connectWallet,
    to: AUTIONContractAddress,
    gasLimit,
  });

  return tsx.transactionHash;
};

export const claimNFT = async ({
  auctionId,
  royaltyAddress,
  royaltyPercent,
}) => {
  const connectWallet = await getCurrentWalletConnected();
  const auctionContract = await loadAuctionContract();

  const gasLimit = await auctionContract.methods
    .claimNFT(auctionId, royaltyAddress, royaltyPercent)
    .estimateGas({
      from: connectWallet,
      to: AUTIONContractAddress,
    });
  const tsx = await auctionContract.methods
    .claimNFT(auctionId, royaltyAddress, royaltyPercent)
    .send({
      from: connectWallet,
      to: AUTIONContractAddress,
      gasLimit,
    });

  return tsx.transactionHash;
};

export const claimToken = async ({
  auctionId,
  royaltyAddress,
  royaltyPercent,
}) => {
  const auctionContract = await loadAuctionContract();
  const connectWallet = await getCurrentWalletConnected();
  const gasLimit = await auctionContract.methods
    .claimToken(auctionId, royaltyAddress, royaltyPercent)
    .estimateGas({
      from: connectWallet,
      to: AUTIONContractAddress,
    });
  const tsx = await auctionContract.methods
    .claimToken(auctionId, royaltyAddress, royaltyPercent)
    .send({
      from: connectWallet,
      to: AUTIONContractAddress,
      gasLimit,
    });

  return tsx.transactionHash;
};

export const createListing = async (collectionAddress, tokenID, priceInput) => {
  const connectWallet = await getCurrentWalletConnected();
  const price = await bigNumberPricing(priceInput);
  const collectionContract = await loadERC721Contract(collectionAddress, false);
  const fixedPriceContract = await loadAFixedPriceContract();

  // verify if is approved
  const isApproved = await collectionContract.methods
    .isApprovedForAll(connectWallet, FIXEDContractAddress)
    .call();

  if (!isApproved) {
    const gasLimitApprouve = await collectionContract.methods
      .setApprovalForAll(FIXEDContractAddress, "true")
      .estimateGas({
        from: connectWallet,
        to: collectionAddress,
      });

    await collectionContract.methods
      .setApprovalForAll(FIXEDContractAddress, "true")
      .send({
        from: connectWallet,
        to: collectionAddress,
        gasLimit: gasLimitApprouve,
      });
  }

  const gasLimit = await fixedPriceContract.methods
    .createListing(collectionAddress, tokenID, price)
    .estimateGas({
      from: connectWallet,
      to: FIXEDContractAddress,
    });

  const tnx = await fixedPriceContract.methods
    .createListing(collectionAddress, tokenID, price)
    .send({
      from: connectWallet,
      to: FIXEDContractAddress,
      gasLimit,
    });

  return {
    listingId: tnx.events.ListingCreated.returnValues.id,
    transactionId: tnx.transactionHash,
  };
};

export const buyItem = async ({
  listingId,
  price,
  royaltyAddress,
  royaltyPercent,
}) => {
  const erc20Contract = await loadERC20Contract();
  const connectWallet = await getCurrentWalletConnected();
  const listingPrice = await bigNumberPricing(price);
  const fixedPriceContract = await loadAFixedPriceContract();

  const allowance = await erc20Contract.methods
    .allowance(connectWallet, FIXEDContractAddress)
    .call();

  if (allowance < price) {
    const gasLimitApprouve = await erc20Contract.methods
      .approve(FIXEDContractAddress, listingPrice)
      .estimateGas({
        from: connectWallet,
        to: FIXEDContractAddress,
      });

    await erc20Contract.methods
      .approve(FIXEDContractAddress, listingPrice)
      .send({
        from: connectWallet,
        to: FIXEDContractAddress,
        gasLimit: gasLimitApprouve,
      });
  }

  const gasLimitBuy = await fixedPriceContract.methods
    .buyToken(listingId, royaltyAddress, royaltyPercent)
    .estimateGas({
      from: connectWallet,
      to: FIXEDContractAddress,
    });

  const tsx = await fixedPriceContract.methods
    .buyToken(listingId, royaltyAddress, royaltyPercent)
    .send({
      from: connectWallet,
      to: FIXEDContractAddress,
      gasLimit: gasLimitBuy,
    });

  return tsx.transactionHash;
};

export const deListItem = async (listingId) => {
  const connectWallet = await getCurrentWalletConnected();
  const fixedPriceContract = await loadAFixedPriceContract();

  const gasLimitBuy = await fixedPriceContract.methods
    .deactivateListing(listingId)
    .estimateGas({
      from: connectWallet,
      to: FIXEDContractAddress,
    });

  const tsx = await fixedPriceContract.methods
    .deactivateListing(listingId)
    .send({
      from: connectWallet,
      to: FIXEDContractAddress,
      gasLimit: gasLimitBuy,
    });

  return tsx.transactionHash;
};

export const makeOfferToOwner = async (collectionAddress, tokenID, price) => {
  const connectWallet = await getCurrentWalletConnected();
  const erc20Contract = await loadERC20Contract();
  const offerSystemContract = await loadOfferSystemContract();

  const offerPrice = await bigNumberPricing(price);

  const gasLimitApprouve = await erc20Contract.methods
    .approve(OfferSystemAddress, offerPrice)
    .estimateGas({
      from: connectWallet,
      to: ERC20ContractAddress,
    });

  await erc20Contract.methods.approve(OfferSystemAddress, offerPrice).send({
    from: connectWallet,
    to: ERC20ContractAddress,
    gasLimit: gasLimitApprouve,
  });

  const gasLimitOffer = await offerSystemContract.methods
    .makeBuyOffer(collectionAddress, tokenID, offerPrice)
    .estimateGas({
      from: connectWallet,
      to: FIXEDContractAddress,
    });

  const tsx = await offerSystemContract.methods
    .makeBuyOffer(collectionAddress, tokenID, offerPrice)
    .send({
      from: connectWallet,
      to: FIXEDContractAddress,
      gasLimit: gasLimitOffer,
    });
  return tsx.transactionHash;
};

export const acceptOffer = async (
  collectionAddress,
  tokenID,
  royaltyAddress,
  royaltyPercent
) => {
  const connectWallet = await getCurrentWalletConnected();
  const offerSystemContract = await loadOfferSystemContract();
  const collectionContract = await loadERC721Contract(collectionAddress, false);

  const isApproved = await collectionContract.methods
    .getApproved(tokenID)
    .call();

  console.log("###############", isApproved);

  if (!sameAddress(isApproved, OfferSystemAddress)) {
    const gasLimitApprouve = await collectionContract.methods
      .approve(OfferSystemAddress, tokenID)
      .estimateGas({
        from: connectWallet,
        to: OfferSystemAddress,
      });

    await collectionContract.methods.approve(OfferSystemAddress, tokenID).send({
      from: connectWallet,
      to: OfferSystemAddress,
      gasLimit: gasLimitApprouve,
    });
  }

  const gasLimitAcceptOffer = await offerSystemContract.methods
    .acceptBuyOffer(collectionAddress, tokenID, royaltyAddress, royaltyPercent)
    .estimateGas({
      from: connectWallet,
      to: OfferSystemAddress,
    });

  const tsx = await offerSystemContract.methods
    .acceptBuyOffer(collectionAddress, tokenID, royaltyAddress, royaltyPercent)
    .send({
      from: connectWallet,
      to: OfferSystemAddress,
      gasLimit: gasLimitAcceptOffer,
    });

  return tsx.transactionHash;
};

const bigNumberPricing = async (price) => {
  const web3 = web3Infura;

  let listingPrice = web3.utils.toWei(price.toString(), "ether");

  listingPrice = web3.utils.toBN(listingPrice);

  return web3.utils.toHex(listingPrice);
};


export const transfertToken = async (collectionAddress, tokenID, to) => {
  const collectionContract = await loadERC721Contract(collectionAddress, false);
  const connectWallet = await getCurrentWalletConnected();


  const gasFees = await collectionContract.methods
    .transferFrom(connectWallet, to, tokenID)
    .estimateGas({
      from: connectWallet,
      to: collectionAddress,
    });


  const tsx = await collectionContract.methods.transferFrom(connectWallet, to, tokenID).send({
    from: connectWallet,
    to: collectionAddress,
    gasLimit: gasFees,
  });

  return tsx.transactionHash;
}
