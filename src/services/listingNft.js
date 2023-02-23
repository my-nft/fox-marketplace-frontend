import Web3 from "web3";
import {
  getCurrentWalletConnected,
  loadAFixedPriceContract,
  loadAuctionContract,
  loadERC20Contract,
  loadERC721Contract,
  loaderContract,
  loadFoxGenisisContract,
  loadOfferSystemContract,
  web3Infura,
} from "../utils/blockchainInteractor";

import { sameAddress } from "../utils/walletUtils";
import { getAddressesByChain } from "./../utils/blockchainInteractor";

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
  console.log(response);
  return {
    price: Number(response.price) / 10 ** 18,
    offerOwner: response.buyer,
    createTime: response.createTime,
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

  if (!sameAddress(isApproved, getAddressesByChain().AUTIONContractAddress)) {
    const gasLimitApprouve = await erc721Contract.methods
      .approve(getAddressesByChain().AUTIONContractAddress, tokenID)
      .estimateGas({
        from: connectWallet,
        to: collectionAddress,
      });

    await erc721Contract.methods
      .approve(getAddressesByChain().AUTIONContractAddress, tokenID)
      .send({
        from: connectWallet,
        to: collectionAddress,
        gasLimit: gasLimitApprouve,
      });
  }

  const gasLimit = await auctionContract.methods
    .createAuction(
      collectionAddress,
      getAddressesByChain().ERC20ContractAddress,
      tokenID,
      price,
      endAuction
    )
    .estimateGas({
      from: connectWallet,
      to: getAddressesByChain().AUTIONContractAddress,
    });

  const tsx = await auctionContract.methods
    .createAuction(
      collectionAddress,
      getAddressesByChain().ERC20ContractAddress,
      tokenID,
      price,
      endAuction
    )
    .send({
      from: connectWallet,
      to: getAddressesByChain().AUTIONContractAddress,
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
    .approve(getAddressesByChain().AUTIONContractAddress, bidValueTrans)
    .estimateGas({
      from: connectWallet,
      to: getAddressesByChain().ERC20ContractAddress,
    });

  await erc20Contract.methods
    .approve(getAddressesByChain().AUTIONContractAddress, bidValueTrans)
    .send({
      from: connectWallet,
      to: getAddressesByChain().ERC20ContractAddress,
      gasLimit: gasLimitApprouve,
    });

  const gasLimitPlaceBid = await auctionContract.methods
    .bid(auctionId, bidValueTrans)
    .estimateGas({
      from: connectWallet,
      to: getAddressesByChain().AUTIONContractAddress,
    });

  const tsx = await auctionContract.methods.bid(auctionId, bidValueTrans).send({
    from: connectWallet,
    to: getAddressesByChain().AUTIONContractAddress,
    gasLimit: gasLimitPlaceBid,
  });

  return tsx.transactionHash;
};

export const refundNft = async (auctionId) => {
  const auctionContract = await loadAuctionContract();
  const connectWallet = await getCurrentWalletConnected();
  const gasLimit = await auctionContract.methods.refund(auctionId).estimateGas({
    from: connectWallet,
    to: getAddressesByChain().AUTIONContractAddress,
  });
  const tsx = await auctionContract.methods.refund(auctionId).send({
    from: connectWallet,
    to: getAddressesByChain().AUTIONContractAddress,
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
      to: getAddressesByChain().AUTIONContractAddress,
    });
  const tsx = await auctionContract.methods
    .claimNFT(auctionId, royaltyAddress, royaltyPercent)
    .send({
      from: connectWallet,
      to: getAddressesByChain().AUTIONContractAddress,
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
      to: getAddressesByChain().AUTIONContractAddress,
    });
  const tsx = await auctionContract.methods
    .claimToken(auctionId, royaltyAddress, royaltyPercent)
    .send({
      from: connectWallet,
      to: getAddressesByChain().AUTIONContractAddress,
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
    .isApprovedForAll(connectWallet, getAddressesByChain().FIXEDContractAddress)
    .call();

  if (!isApproved) {
    const gasLimitApprouve = await collectionContract.methods
      .setApprovalForAll(getAddressesByChain().FIXEDContractAddress, "true")
      .estimateGas({
        from: connectWallet,
        to: collectionAddress,
      });

    await collectionContract.methods
      .setApprovalForAll(getAddressesByChain().FIXEDContractAddress, "true")
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
      to: getAddressesByChain().FIXEDContractAddress,
    });

  const tnx = await fixedPriceContract.methods
    .createListing(collectionAddress, tokenID, price)
    .send({
      from: connectWallet,
      to: getAddressesByChain().FIXEDContractAddress,
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
    .allowance(connectWallet, getAddressesByChain().FIXEDContractAddress)
    .call();

  if (allowance < price) {
    const gasLimitApprouve = await erc20Contract.methods
      .approve(getAddressesByChain().FIXEDContractAddress, listingPrice)
      .estimateGas({
        from: connectWallet,
        to: getAddressesByChain().FIXEDContractAddress,
      });

    await erc20Contract.methods
      .approve(getAddressesByChain().FIXEDContractAddress, listingPrice)
      .send({
        from: connectWallet,
        to: getAddressesByChain().FIXEDContractAddress,
        gasLimit: gasLimitApprouve,
      });
  }

  const gasLimitBuy = await fixedPriceContract.methods
    .buyToken(listingId, royaltyAddress, royaltyPercent)
    .estimateGas({
      from: connectWallet,
      to: getAddressesByChain().FIXEDContractAddress,
    });

  const tsx = await fixedPriceContract.methods
    .buyToken(listingId, royaltyAddress, royaltyPercent)
    .send({
      from: connectWallet,
      to: getAddressesByChain().FIXEDContractAddress,
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
      to: getAddressesByChain().FIXEDContractAddress,
    });

  const tsx = await fixedPriceContract.methods
    .deactivateListing(listingId)
    .send({
      from: connectWallet,
      to: getAddressesByChain().FIXEDContractAddress,
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
    .approve(getAddressesByChain().OfferSystemAddress, offerPrice)
    .estimateGas({
      from: connectWallet,
      to: getAddressesByChain().ERC20ContractAddress,
    });

  await erc20Contract.methods
    .approve(getAddressesByChain().OfferSystemAddress, offerPrice)
    .send({
      from: connectWallet,
      to: getAddressesByChain().ERC20ContractAddress,
      gasLimit: gasLimitApprouve,
    });

  const gasLimitOffer = await offerSystemContract.methods
    .makeBuyOffer(collectionAddress, tokenID, offerPrice)
    .estimateGas({
      from: connectWallet,
      to: getAddressesByChain().FIXEDContractAddress,
    });

  const tsx = await offerSystemContract.methods
    .makeBuyOffer(collectionAddress, tokenID, offerPrice)
    .send({
      from: connectWallet,
      to: getAddressesByChain().FIXEDContractAddress,
      gasLimit: gasLimitOffer,
    });
  return tsx.transactionHash;
};

export const withdrawOffer = async (collectionAddress, tokenID) => {
  const connectWallet = await getCurrentWalletConnected();
  const offerSystemContract = await loadOfferSystemContract();

  const gasLimitAcceptOffer = await offerSystemContract.methods
    .withdrawBuyOffer(collectionAddress, tokenID)
    .estimateGas({
      from: connectWallet,
      to: getAddressesByChain().OfferSystemAddress,
    });

  const tsx = await offerSystemContract.methods
    .withdrawBuyOffer(collectionAddress, tokenID)
    .send({
      from: connectWallet,
      to: getAddressesByChain().OfferSystemAddress,
      gasLimit: gasLimitAcceptOffer,
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

  if (!sameAddress(isApproved, getAddressesByChain().OfferSystemAddress)) {
    const gasLimitApprouve = await collectionContract.methods
      .approve(getAddressesByChain().OfferSystemAddress, tokenID)
      .estimateGas({
        from: connectWallet,
        to: getAddressesByChain().OfferSystemAddress,
      });

    await collectionContract.methods
      .approve(getAddressesByChain().OfferSystemAddress, tokenID)
      .send({
        from: connectWallet,
        to: getAddressesByChain().OfferSystemAddress,
        gasLimit: gasLimitApprouve,
      });
  }

  const gasLimitAcceptOffer = await offerSystemContract.methods
    .acceptBuyOffer(collectionAddress, tokenID, royaltyAddress, royaltyPercent)
    .estimateGas({
      from: connectWallet,
      to: getAddressesByChain().OfferSystemAddress,
    });

  const tsx = await offerSystemContract.methods
    .acceptBuyOffer(collectionAddress, tokenID, royaltyAddress, royaltyPercent)
    .send({
      from: connectWallet,
      to: getAddressesByChain().OfferSystemAddress,
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

  const tsx = await collectionContract.methods
    .transferFrom(connectWallet, to, tokenID)
    .send({
      from: connectWallet,
      to: collectionAddress,
      gasLimit: gasFees,
    });

  return tsx.transactionHash;
};

export const getMinted = async () => {
  const connectWallet = await getCurrentWalletConnected();
  const erc721Contract = await loadFoxGenisisContract(true);
  return erc721Contract.methods.minted(connectWallet).call();
};

export const getMintingData = async () => {
  const erc721Contract = await loadFoxGenisisContract(true);
  const maxPerTransaction = await erc721Contract.methods
    .maxPerTransaction()
    .call();
  const maxPerWallet = await erc721Contract.methods.maxPerWallet().call();
  const maxToMint = await erc721Contract.methods.maxToMint().call();
  const mintFee = await erc721Contract.methods.mintFee().call();
  const mintingEnabled = await erc721Contract.methods.mintingEnabled().call();
  const name = await erc721Contract.methods.name().call();
  const totalSupply = await erc721Contract.methods.totalSupply().call();
  const symbol = await erc721Contract.methods.symbol().call();
  const whitelistingEnabled = await erc721Contract.methods
    .whitelistingEnabled()
    .call();
  return {
    maxPerTransaction,
    maxPerWallet,
    maxToMint,
    mintFee,
    mintingEnabled,
    totalSupply,
    name,
    symbol,
    whitelistingEnabled,
  };
};

export const totalSupply = async () => {
  const erc721Contract = await loadFoxGenisisContract(true);
  return await erc721Contract.methods.totalSupply();
};

export const mintNfts = async (total) => {
  const connectWallet = await getCurrentWalletConnected();

  const erc721ContractRead = await loadFoxGenisisContract(true);
  const erc721Contract = await loadFoxGenisisContract(false);

  const mintFee = await erc721ContractRead.methods.mintFee().call();

  const value = web3Infura.utils.toHex(Number(mintFee) * Number(total));

  const gasLimit = await erc721Contract.methods.mint(total).estimateGas({
    from: connectWallet,
    to: getAddressesByChain().foxGenesisCollectionAddress,
    value,
  });
  await erc721Contract.methods.mint(total).send({
    from: connectWallet,
    to: getAddressesByChain().foxGenesisCollectionAddress,
    gasLimit: gasLimit,
    value,
  });
};
