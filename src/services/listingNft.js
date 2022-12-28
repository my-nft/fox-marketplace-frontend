import Web3 from "web3";
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
  loadOfferSystemContract,
  OfferSystemAddress,
} from "../utils/blockchainInteractor";

import { sameAddress } from "../utils/walletUtils";

const auctionContractReadOnly = loadAuctionContract(true);

const fixedPriceContractReadOnly = loadAFixedPriceContract(true);
const offerSystemContractReadOnly = loadOfferSystemContract(true);

export const nftLoader = async (collectionAddress) => {
  const contract = loaderContract();
  const connectWallet = await getCurrentWalletConnected();

  const tx = await contract.methods
    .getTokens(connectWallet, 1, 100, collectionAddress)
    .call();
};

export const ownerOf = async (collectionAddress, tokenID) => {
  const erc721Contract = loadERC721Contract(collectionAddress, true);
  return await erc721Contract.methods.ownerOf(tokenID).call();
};

export const getPriceByListing = async (listingId) => {
  const listingPrice = await fixedPriceContractReadOnly.methods
    .getPriceByListing(listingId)
    .call();
  return listingPrice / 10 ** 18;
};

export const getBestOffer = async (collectionAddress, tokenID) => {
  const response = await offerSystemContractReadOnly.methods
    .activeBuyOffers(collectionAddress, tokenID)
    .call();
  return Number(response.price) / 10 ** 18;
};

export const isActiveListing = async (listingId) => {
  const response = await fixedPriceContractReadOnly.methods
    .listings(listingId)
    .call();
  return response.active;
};

export const getListingIdByToken = async (collectionAddress, tokenID) => {
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
  const price = bigNumberPricing(initialPrice);
  const erc721Contract = loadERC721Contract(collectionAddress, false);
  const auctionContract = loadAuctionContract();


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

  await auctionContract.methods
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

  return auctionId;
};

export const getAuctionInfos = async (auctionId) => {
  try {
    return await auctionContractReadOnly.methods.allAuctions(auctionId).call();
  } catch (error) {}
};

export const placeBid = async (auctionId, bidValue) => {
  const erc20Contract = loadERC20Contract();
  const connectWallet = await getCurrentWalletConnected();
  const bidValueTrans = bigNumberPricing(bidValue);
  const auctionContract = loadAuctionContract();


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

  await auctionContract.methods.bid(auctionId, bidValueTrans).send({
    from: connectWallet,
    to: AUTIONContractAddress,
    gasLimit: gasLimitPlaceBid,
  });
};

export const refundNft = async (auctionId) => {
  const auctionContract = loadAuctionContract();
  const connectWallet = await getCurrentWalletConnected();
  const gasLimit = await auctionContract.methods.refund(auctionId).estimateGas({
    from: connectWallet,
    to: AUTIONContractAddress,
  });
  await auctionContract.methods.refund(auctionId).send({
    from: connectWallet,
    to: AUTIONContractAddress,
    gasLimit,
  });
};

export const claimNFT = async ({
  auctionId,
  royaltyAddress,
  royaltyPercent,
}) => {
  const connectWallet = await getCurrentWalletConnected();
  const auctionContract = loadAuctionContract();

  const gasLimit = await auctionContract.methods
    .claimNFT(auctionId, royaltyAddress, royaltyPercent)
    .estimateGas({
      from: connectWallet,
      to: AUTIONContractAddress,
    });
  await auctionContract.methods
    .claimNFT(auctionId, royaltyAddress, royaltyPercent)
    .send({
      from: connectWallet,
      to: AUTIONContractAddress,
      gasLimit,
    });
};

export const claimToken = async ({
  auctionId,
  royaltyAddress,
  royaltyPercent,
}) => {
  const auctionContract = loadAuctionContract();
  const connectWallet = await getCurrentWalletConnected();
  const gasLimit = await auctionContract.methods
    .claimToken(auctionId, royaltyAddress, royaltyPercent)
    .estimateGas({
      from: connectWallet,
      to: AUTIONContractAddress,
    });
  await auctionContract.methods
    .claimToken(auctionId, royaltyAddress, royaltyPercent)
    .send({
      from: connectWallet,
      to: AUTIONContractAddress,
      gasLimit,
    });
};

export const createListing = async (collectionAddress, tokenID, priceInput) => {
  const connectWallet = await getCurrentWalletConnected();
  const price = bigNumberPricing(priceInput);
  const collectionContract = loadERC721Contract(collectionAddress, false);
  const fixedPriceContract = loadAFixedPriceContract();

  // verify if is approved
  const isApproved = await collectionContract.methods.isApprovedForAll(
    connectWallet,
    FIXEDContractAddress
  ).call();

  if(!isApproved) {
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

  return tnx.events.ListingCreated.returnValues.id;
};

export const buyItem = async ({
  listingId,
  price,
  royaltyAddress,
  royaltyPercent,
}) => {
  const erc20Contract = loadERC20Contract();
  const connectWallet = await getCurrentWalletConnected();
  const listingPrice = bigNumberPricing(price);
  const fixedPriceContract = loadAFixedPriceContract();


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

  await fixedPriceContract.methods
    .buyToken(listingId, royaltyAddress, royaltyPercent)
    .send({
      from: connectWallet,
      to: FIXEDContractAddress,
      gasLimit: gasLimitBuy,
    });
};

export const deListItem = async (listingId) => {
  
    const connectWallet = await getCurrentWalletConnected();
    const fixedPriceContract = loadAFixedPriceContract();

    const gasLimitBuy = await fixedPriceContract.methods
      .deactivateListing(listingId)
      .estimateGas({
        from: connectWallet,
        to: FIXEDContractAddress,
      });

    await fixedPriceContract.methods.deactivateListing(listingId).send({
      from: connectWallet,
      to: FIXEDContractAddress,
      gasLimit: gasLimitBuy,
    });
};

export const makeOfferToOwner = async (collectionAddress, tokenID, price) => {
  const connectWallet = await getCurrentWalletConnected();
  const erc20Contract = loadERC20Contract();
  const offerSystemContract = loadOfferSystemContract();

  const offerPrice = bigNumberPricing(price);

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

  await offerSystemContract.methods
    .makeBuyOffer(collectionAddress, tokenID, offerPrice)
    .send({
      from: connectWallet,
      to: FIXEDContractAddress,
      gasLimit: gasLimitOffer,
    });
};

export const acceptOffer = async (
  collectionAddress,
  tokenID,
  royaltyAddress,
  royaltyPercent
) => {
  const connectWallet = await getCurrentWalletConnected();
  const offerSystemContract = loadOfferSystemContract();
  const collectionContract = loadERC721Contract(collectionAddress, false);

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

  await offerSystemContract.methods
    .acceptBuyOffer(collectionAddress, tokenID, royaltyAddress, royaltyPercent)
    .send({
      from: connectWallet,
      to: OfferSystemAddress,
      gasLimit: gasLimitAcceptOffer,
    });
};

const bigNumberPricing = (price) => {

  const web3 = new Web3(Web3.givenProvider)

  let listingPrice = web3.utils.toWei(price.toString(), "ether");

  listingPrice = web3.utils.toBN(listingPrice);

  return web3.utils.toHex(listingPrice);
};
