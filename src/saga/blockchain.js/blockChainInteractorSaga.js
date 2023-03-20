import { setIsLoading } from "../../redux/nftReducer";
import * as nftApi from "../../api/nftApi";
import { call, put, select, takeLatest } from "redux-saga/effects";
import { toast } from "react-toastify";
import {
  buyItem,
  deListItem,
  makeOfferToOwner,
  acceptOffer,
  placeBid,
  createListing,
  createAuction,
  refundNft,
  claimNFT,
  claimToken,
  getListingIdByToken,
  withdrawOffer,
} from "../../services/listingNft";
import {
  ACCEPT_OFFER,
  BUY_NFT,
  CLAIM_NFT,
  CLAIM_TOKEN,
  DELIST_ITEM,
  LISTING_AUCTION,
  LISTING_FIXED_PRICE,
  MAKE_OFFER,
  PLACE_BID,
  REFUND_NFT,
  WITHDRAW_OFFER,
} from "./blockChainActions";
import {
  AUCTION,
  EVENT_ACCEPT_OFFER,
  EVENT_BUY_LISTING,
  EVENT_CREATE_AUCTION,
  EVENT_DELISTING,
  EVENT_LISTING,
  EVENT_MAKE_OFFER,
  EVENT_PLACE_BID,
  EVENT_REFUND,
  EVENT_WIN_AUCTION,
  EVENT_WITHDRAW_OFFER,
  FIXED_PRICE,
} from "../../utils/foxConstantes";
import { signWallet } from "../userSaga";
import { postTraceTransaction } from "../../api/utilsApi";

const ACTION_ACCEPT_OFFER = "ACCEPT_OFFER";
const ACTION_BUY_TOKEN = "BUY_TOKEN";
const ACTION_BUY_AUCTION = "BUY_AUCTION";

function* runBuyNft(action) {
  try {
    const {
      listingId,
      price,
      tokenID,
      collectionAddress,
      royaltyAddress,
      royaltyPercent,
      from,
      to,
    } = action.payload;

    yield put(setIsLoading(true));

    const token = yield call(signWallet);

    const tsxId = yield call(buyItem, {
      listingId,
      price,
      royaltyAddress,
      royaltyPercent,
    });

    yield call(
      nftApi.setNftToUnlisted,
      { collectionAddress, tokenID, action: ACTION_BUY_TOKEN },
      token
    );

    postTraceTransaction(
      {
        fromAddress: from,
        toAddress: to,
        price,
        collectionAddress,
        tokenID,
        event: EVENT_BUY_LISTING,
        transactionId: tsxId,
      },
      token
    );

    const nftDetails = yield call(
      nftApi.getNftCall,
      collectionAddress,
      tokenID
    );

    // putting the NFT details
    yield put(setIsLoading(false));
    action.onSuccess(nftDetails.data);
  } catch (error) {
    console.log("error ", error);
    toast.error(error.message || "An unexpected error occurred.");
  } finally {
    yield put(setIsLoading(false));
  }
}

function* runMakeOffer(action) {
  try {
    const { price, tokenID, collectionAddress, from, to } = action.payload;

    yield put(setIsLoading(true));

    const token = yield call(signWallet);

    const tsxId = yield call(
      makeOfferToOwner,
      collectionAddress,
      tokenID,
      price
    );

    yield call(nftApi.makeOffer, {
      collectionAddress,
      tokenID,
      price,
      token
    });

    postTraceTransaction(
      {
        fromAddress: from,
        toAddress: to,
        price,
        collectionAddress,
        tokenID,
        event: EVENT_MAKE_OFFER,
        transactionId: tsxId,
      },
      token
    );

    const nftDetails = yield call(
      nftApi.getNftCall,
      collectionAddress,
      tokenID
    );

    // putting the NFT details
    yield put(setIsLoading(false));
    action.onSuccess(nftDetails.data);
  } catch (error) {
    console.log("error ", error);
    toast.error(error.message || "An unexpected error occurred.");
  } finally {
    yield put(setIsLoading(false));
  }
}

function* runDelistItem(action) {
  try {
    const { listingId, collectionAddress, tokenID, from, to, price } =
      action.payload;
    const token = yield call(signWallet);

    yield put(setIsLoading(true));

    // unlist from Blockchain
    const tsxId = yield call(deListItem, listingId);

    // unlist from DB
    yield call(
      nftApi.setNftToUnlisted,
      {
        collectionAddress,
        tokenID,
      },
      token
    );

    postTraceTransaction(
      {
        fromAddress: from,
        toAddress: to,
        price,
        collectionAddress,
        tokenID,
        event: EVENT_DELISTING,
        transactionId: tsxId,
      },
      token
    );

    const nftDetails = yield call(
      nftApi.getNftCall,
      collectionAddress,
      tokenID
    );
    // putting the NFT details
    yield put(setIsLoading(false));
    action.onSuccess(nftDetails.data);
  } catch (error) {
    console.log("error ", error);
    toast.error(error.message || "An unexpected error occurred.");
  } finally {
    yield put(setIsLoading(false));
  }
}

function* runWithdrawOffer(action) {
  try {
    
    const { collectionAddress, tokenID, from, to, price } =
      action.payload;

    yield put(setIsLoading(true));

    const token = yield call(signWallet);

    const tsxId = yield call(withdrawOffer,collectionAddress, tokenID);


    postTraceTransaction(
      {
        fromAddress: from,
        toAddress: to,
        price,
        collectionAddress,
        tokenID,
        event: EVENT_WITHDRAW_OFFER,
        transactionId: tsxId,
      },
      token
    );

    const nftDetails = yield call(
      nftApi.getNftCall,
      collectionAddress,
      tokenID
    );
    // putting the NFT details
    yield put(setIsLoading(false));
    action.onSuccess(nftDetails.data);
    
  } catch (error) {
    console.log("error ", error);
    toast.error(error.message || "An unexpected error occurred.");
  } finally {
    yield put(setIsLoading(false));
  }
}

function* runAcceptOffer(action) {
  try {
    const {
      collectionAddress,
      tokenID,
      royaltyAddress,
      royaltyPercent,
      from,
      to,
      price,
    } = action.payload;
    yield put(setIsLoading(true));
    const token = yield call(signWallet);

    const listingId = yield call(
      getListingIdByToken,
      collectionAddress,
      tokenID
    );

    if (listingId) {
      // unlist manually from blockchain
      yield call(deListItem, listingId);
    }

    // unlist from Blockchain
    const tsxId = yield call(
      acceptOffer,
      collectionAddress,
      tokenID,
      royaltyAddress,
      royaltyPercent
    );

    // unlist from DB
    yield call(
      nftApi.setNftToUnlisted,
      {
        collectionAddress,
        tokenID,
        action: ACTION_ACCEPT_OFFER,
      },
      token
    );

    postTraceTransaction(
      {
        fromAddress: from,
        toAddress: to,
        price,
        collectionAddress,
        tokenID,
        event: EVENT_ACCEPT_OFFER,
        transactionId: tsxId,
      },
      token
    );

    const response = yield call(nftApi.getNftCall, collectionAddress, tokenID);

    // putting the NFT details
    yield put(setIsLoading(false));
    action.onSuccess(response.data);
  } catch (error) {
    console.log("error ", error);
    toast.error(error.message || "An unexpected error occurred.");
  } finally {
    yield put(setIsLoading(false));
  }
}

function* runPlaceBid(action) {
  try {
    const { auctionId, price, collectionAddress, tokenID, from, to } =
      action.payload;

    yield put(setIsLoading(true));

    const token = yield call(signWallet);

    // unlist from Blockchain
    const tsxId = yield call(placeBid, auctionId, price);

    postTraceTransaction(
      {
        fromAddress: from,
        toAddress: to,
        price,
        collectionAddress,
        tokenID,
        event: EVENT_PLACE_BID,
        transactionId: tsxId,
      },
      token
    );

    const response = yield call(nftApi.getNftCall, collectionAddress, tokenID);

    // putting the NFT details
    yield put(setIsLoading(false));
    action.onSuccess(response.data);
  } catch (error) {
    console.log("error ", error);
    toast.error(error.message || "An unexpected error occurred.");
  } finally {
    yield put(setIsLoading(false));
  }
}

function* runListFixedPrice(action) {
  try {
    const { collectionAddress, tokenID, fixedPrice, from, to } = action.payload;
    const token = yield call(signWallet);
    yield put(setIsLoading(true));

    // unlist from Blockchain
    const { listingId, transactionId } = yield call(
      createListing,
      collectionAddress,
      tokenID,
      fixedPrice
    );

    // Mark the NFT as Listed in DB
    yield call(
      nftApi.setNftToListed,
      {
        collectionAddress,
        tokenID,
        listingType: FIXED_PRICE,
        price: fixedPrice,
        listingId: Number(listingId),
      },
      token
    );

    postTraceTransaction(
      {
        fromAddress: from,
        toAddress: to,
        price: fixedPrice,
        collectionAddress,
        tokenID,
        event: EVENT_LISTING,
        transactionId,
      },
      token
    );

    const response = yield call(nftApi.getNftCall, collectionAddress, tokenID);

    // putting the NFT details
    yield put(setIsLoading(false));
    action.onSuccess(response.data);
  } catch (error) {
    console.log("error ", error);
    toast.error(error.message || "An unexpected error occurred.");
  } finally {
    yield put(setIsLoading(false));
  }
}

function* runListingAuction(action) {
  try {
    const { collectionAddress, tokenID, auctionPrice, endAuction, from, to } =
      action.payload;

    const token = yield call(signWallet);

    yield put(setIsLoading(true));

    const { auctionId, transactionId } = yield call(
      createAuction,
      collectionAddress,
      tokenID,
      auctionPrice,
      endAuction
    );

    yield call(
      nftApi.setNftToListed,
      {
        collectionAddress,
        tokenID,
        auctionId,
        endAuction,
        listingType: AUCTION,
      },
      token
    );

    postTraceTransaction(
      {
        fromAddress: from,
        toAddress: to,
        price: auctionPrice,
        collectionAddress,
        tokenID,
        event: EVENT_CREATE_AUCTION,
        transactionId,
      },
      token
    );

    const nftDetails = yield call(
      nftApi.getNftCall,
      collectionAddress,
      tokenID
    );

    yield put(setIsLoading(false));
    action.onSuccess(nftDetails.data);
  } catch (error) {
    console.log("error ", error);
    toast.error(error.message || "An unexpected error occurred.");
  } finally {
    yield put(setIsLoading(false));
  }
}

function* runHandleRefund(action) {
  const { auctionId, collectionAddress, tokenID, from, to, price } =
    action.payload;

  try {
    yield put(setIsLoading(true));

    const token = yield call(signWallet);

    const tsxId = yield call(refundNft, auctionId);

    yield call(
      nftApi.setNftToUnlisted,
      {
        collectionAddress,
        tokenID,
      },
      token
    );

    postTraceTransaction(
      {
        fromAddress: from,
        toAddress: to,
        price,
        collectionAddress,
        tokenID,
        event: EVENT_REFUND,
        transactionId: tsxId,
      },
      token
    );

    // get the nft details
    const response = yield call(nftApi.getNftCall, collectionAddress, tokenID);

    yield put(setIsLoading(false));
    action.onSuccess(response.data);
  } catch (error) {
    console.log("error ", error);
    toast.error(error.message || "An unexpected error occurred.");
  } finally {
    yield put(setIsLoading(false));
  }
}

function* runHandleClaimNFT(action) {
  const {
    auctionId,
    collectionAddress,
    tokenID,
    royaltyAddress,
    royaltyPercent,
    from,
    to,
    price,
  } = action.payload;

  try {
    yield put(setIsLoading(true));

    const token = yield call(signWallet);

    const tsxId = yield call(claimNFT, {
      auctionId,
      royaltyAddress,
      royaltyPercent,
    });

    yield call(
      nftApi.setNftToUnlisted,
      {
        collectionAddress,
        tokenID,
        action: ACTION_BUY_AUCTION,
      },
      token
    );

    postTraceTransaction(
      {
        fromAddress: from,
        toAddress: to,
        price,
        collectionAddress,
        tokenID,
        event: EVENT_WIN_AUCTION,
        transactionId: tsxId,
      },
      token
    );

    // get the nft details
    const response = yield call(nftApi.getNftCall, collectionAddress, tokenID);

    // putting the NFT details
    yield put(setIsLoading(false));
    action.onSuccess(response.data);
  } catch (error) {
    console.log("error ", error);
    toast.error(error.message || "An unexpected error occurred.");
  } finally {
    yield put(setIsLoading(false));
  }
}

function* runHandleClaimToken(action) {
  const {
    auctionId,
    collectionAddress,
    tokenID,
    royaltyAddress,
    royaltyPercent,
    from,
    to,
    price,
  } = action.payload;

  try {
    yield put(setIsLoading(true));

    const token = yield call(signWallet);

    const tsxId = yield call(claimToken, {
      auctionId,
      royaltyAddress,
      royaltyPercent,
    });

    yield call(
      nftApi.setNftToUnlisted,
      {
        collectionAddress,
        tokenID,
        action: ACTION_BUY_AUCTION,
      },
      token
    );

    postTraceTransaction(
      {
        fromAddress: from,
        toAddress: to,
        price,
        collectionAddress,
        tokenID,
        event: EVENT_WIN_AUCTION,
        transactionId: tsxId,
      },
      token
    );

    yield call(
      nftApi.setNftToUnlisted,
      {
        collectionAddress,
        tokenID,
      },
      token
    );
    // get the nft details
    const response = yield call(nftApi.getNftCall, collectionAddress, tokenID);

    // putting the NFT details
    yield put(setIsLoading(false));
    action.onSuccess(response.data);
  } catch (error) {
    console.log("error ", error);
    toast.error(error.message || "An unexpected error occurred.");
  } finally {
    yield put(setIsLoading(false));
  }
}

function* refund() {
  yield takeLatest(REFUND_NFT, runHandleRefund);
}

function* claimNFTSaga() {
  yield takeLatest(CLAIM_NFT, runHandleClaimNFT);
}

function* claimTokenSaga() {
  yield takeLatest(CLAIM_TOKEN, runHandleClaimToken);
}

function* buyNft() {
  yield takeLatest(BUY_NFT, runBuyNft);
}

function* makeOffer() {
  yield takeLatest(MAKE_OFFER, runMakeOffer);
}

function* delistItem() {
  yield takeLatest(DELIST_ITEM, runDelistItem);
}

function* acceptOfferSaga() {
  yield takeLatest(ACCEPT_OFFER, runAcceptOffer);
}

function* withdrawOfferSaga() {
  yield takeLatest(WITHDRAW_OFFER, runWithdrawOffer)
}

function* placeBidSaga() {
  yield takeLatest(PLACE_BID, runPlaceBid);
}

function* listFixedPrice() {
  yield takeLatest(LISTING_FIXED_PRICE, runListFixedPrice);
}

function* listingAuction() {
  yield takeLatest(LISTING_AUCTION, runListingAuction);
}

export {
  buyNft,
  makeOffer,
  delistItem,
  acceptOfferSaga,
  placeBidSaga,
  listFixedPrice,
  listingAuction,
  refund,
  claimNFTSaga,
  claimTokenSaga,
  withdrawOfferSaga
};
