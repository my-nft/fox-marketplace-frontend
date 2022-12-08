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
  marketplaceContractAddress,
  web3,
} from "../utils/blockchainInteractor";

import { setNftToListed } from "../api/nftApi";
import { toast } from "react-toastify";
import { FIXED_PRICE } from "../utils/foxConstantes";

const auctionContract = loadAuctionContract();
const erc20Contract = loadERC20Contract();
const fixedPriceContract = loadAFixedPriceContract();

export const nftLoader = async (collectionAddress) => {
  const contract = loaderContract();
  const connectWallet = getCurrentWalletConnected();

  const tx = await contract.methods
    .getTokens(connectWallet, 1, 100, collectionAddress)
    .call();

  console.log(connectWallet, collectionAddress);

  console.log(" ", tx);
};

export const ownerOf = async (collectionAddress, tokenID) => {
  const erc721Contract = loadERC721Contract(collectionAddress);
  return await erc721Contract.methods.ownerOf(tokenID).call();
};

export const getPriceByListing = async (listingId) => {
  const listingPrice = await fixedPriceContract.methods
    .getPriceByListing(listingId)
    .call();
  return listingPrice / 10 ** 18;
};

export const getBestOffer = async (collectionAddress, tokenID) => {

  const response = await fixedPriceContract.methods
    .activeBuyOffers(collectionAddress, tokenID)
    .call();
  return  Number(response.price) / 10 ** 18;
};

export const createAuction = async (
  collectionAddress,
  tokenID,
  initialPrice,
  endAuction,
  listingType
) => {
  try {
    const connectWallet = getCurrentWalletConnected();
    const price = web3.utils.toHex(initialPrice * 10 ** 18);
    const erc721Contract = loadERC721Contract(collectionAddress);

    console.log("TOKENID : ", tokenID);
    console.log("PRICE : ", collectionAddress);
    console.log("WALLET : ", connectWallet);

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

    const tnx = await auctionContract.methods
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

    const auctionId = tnx.events.NewAuction.returnValues[0];

    // Mark the NFT as Listed in DB
    await setNftToListed({
      collectionAddress,
      tokenID,
      listingType,
      auctionId,
      endAuction,
    });
    toast.success("Auction created with success !");

    return tnx;
  } catch (error) {
    toast.error("Something went wrong!");
    console.error(error);
  }
};

export const getAuctionInfos = async (auctionId) => {
  try {
    if (auctionId) {
      return await auctionContract.methods.allAuctions(auctionId).call();
    }
  } catch (error) {
    console.log(error);
  }
};

export const placeBid = async (auctionId, bidValue) => {
  const connectWallet = getCurrentWalletConnected();
  const bidValueTrans = web3.utils.toHex(bidValue * 10 ** 18);

  try {
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
  } catch (error) {
    console.log(error);
    toast.error(error.message);
  }
};

export const refundNft = async (auctionId) => {
  try {
    const connectWallet = getCurrentWalletConnected();
    const gasLimit = await auctionContract.methods
      .refund(auctionId)
      .estimateGas({
        from: connectWallet,
        to: AUTIONContractAddress,
      });
    await auctionContract.methods.refund(auctionId).send({
      from: connectWallet,
      to: AUTIONContractAddress,
      gasLimit,
    });
  } catch (error) {
    console.log(error);
    toast.error(error.message);
  }
};

export const claimNFT = async (auctionId) => {
  try {
    const connectWallet = getCurrentWalletConnected();
    const gasLimit = await auctionContract.methods
      .claimNFT(auctionId)
      .estimateGas({
        from: connectWallet,
        to: AUTIONContractAddress,
      });
    await auctionContract.methods.claimNFT(auctionId).send({
      from: connectWallet,
      to: AUTIONContractAddress,
      gasLimit,
    });
  } catch (error) {
    console.log(error);
    toast.error(error.message);
  }
};

export const claimToken = async (auctionId) => {
  const connectWallet = getCurrentWalletConnected();
  const gasLimit = await auctionContract.methods
    .claimToken(auctionId)
    .estimateGas({
      from: connectWallet,
      to: AUTIONContractAddress,
    });
  await auctionContract.methods.claimToken(auctionId).send({
    from: connectWallet,
    to: AUTIONContractAddress,
    gasLimit,
  });
};

export const createListing = async (collectionAddress, tokenID, priceInput) => {
  try {
    const connectWallet = getCurrentWalletConnected();
    const price = web3.utils.toHex(priceInput * 10 ** 18);
    const collectionContract = loadERC721Contract(collectionAddress);

    console.log("TOKENID : ", tokenID);
    console.log("PRICE : ", price);
    console.log("WALLET : ", connectWallet);
    console.log("FIXEDContractAddress : ", FIXEDContractAddress);
    console.log("collectionAddress", collectionAddress);
    console.log("fixedPriceContract", fixedPriceContract);

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

    console.log("#################=>", tnx);

    // Mark the NFT as Listed in DB
    await setNftToListed({
      collectionAddress,
      tokenID,
      listingType: FIXED_PRICE,
      price: priceInput,
      listingId: Number(tnx.events.ListingCreated.returnValues.id),
    });
  } catch (error) {
    console.log(error);
    toast.error(error.message);
  }
};

export const buyItem = async (listingId, price) => {
  const connectWallet = getCurrentWalletConnected();
  const listingPrice = web3.utils.toHex(price * 10 ** 18);

  const gasLimitApprouve = await erc20Contract.methods
    .approve(FIXEDContractAddress, listingPrice)
    .estimateGas({
      from: connectWallet,
      to: marketplaceContractAddress,
    });

  await erc20Contract.methods.approve(FIXEDContractAddress, listingPrice).send({
    from: connectWallet,
    to: marketplaceContractAddress,
    gasLimit: gasLimitApprouve,
  });

  const gasLimitBuy = await fixedPriceContract.methods
    .buyToken(listingId)
    .estimateGas({
      from: connectWallet,
      to: marketplaceContractAddress,
    });

  await fixedPriceContract.methods.buyToken(listingId).send({
    from: connectWallet,
    to: marketplaceContractAddress,
    gasLimit: gasLimitBuy,
  });
};

export const deListItem = async (listingId) => {
  try {
    const connectWallet = getCurrentWalletConnected();

    const gasLimitBuy = await fixedPriceContract.methods
      .deactivateListing(listingId)
      .estimateGas({
        from: connectWallet,
        to: marketplaceContractAddress,
      });

    await fixedPriceContract.methods.deactivateListing(listingId).send({
      from: connectWallet,
      to: marketplaceContractAddress,
      gasLimit: gasLimitBuy,
    });
  } catch (error) {
    console.log(error);
    toast.error(error.message);
  }
};

export const makeOfferToOwner = async (listingId, price) => {
  const connectWallet = getCurrentWalletConnected();

  const offerPrice = web3.utils.toHex(price * 10 ** 18);

  const gasLimitApprouve = await erc20Contract.methods
    .approve(FIXEDContractAddress, offerPrice)
    .estimateGas({
      from: connectWallet,
      to: ERC20ContractAddress,
    });

  await erc20Contract.methods.approve(FIXEDContractAddress, offerPrice).send({
    from: connectWallet,
    to: ERC20ContractAddress,
    gasLimit: gasLimitApprouve,
  });

  const gasLimitOffer = await fixedPriceContract.methods
    .makeBuyOffer(listingId, offerPrice)
    .estimateGas({
      from: connectWallet,
      to: FIXEDContractAddress,
    });

  await fixedPriceContract.methods.makeBuyOffer(listingId, offerPrice).send({
    from: connectWallet,
    to: FIXEDContractAddress,
    gasLimit: gasLimitOffer,
  });
};

export const acceptOffer  = async (listingId) => {


  console.log("€€€€€€€€€€€€e", listingId);
  const connectWallet = getCurrentWalletConnected();

  const gasLimitAcceptOffer = await fixedPriceContract.methods
  .acceptBuyOffer(listingId)
  .estimateGas({
    from: connectWallet,
    to: FIXEDContractAddress,
  });

  await fixedPriceContract.methods.acceptBuyOffer(listingId).send({
    from: connectWallet,
    to: FIXEDContractAddress,
    gasLimit: gasLimitAcceptOffer,
  });
}
