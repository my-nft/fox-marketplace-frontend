import { setIsLoading } from "../../redux/nftReducer";
import * as nftApi from "../../api/nftApi";
import { call, put, takeLatest } from "redux-saga/effects";
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
} from "./blockChainActions";
import { AUCTION, FIXED_PRICE } from "../../utils/foxConstantes";

function* runBuyNft(action) {
  try {
    const { listingId, price, tokenID, collectionAddress } = action.payload;

    yield put(setIsLoading(true));

    yield call(buyItem, listingId, price);

    yield call(nftApi.setNftToUnlisted, { collectionAddress, tokenID });

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
    toast.error("An unexpected error occurred.");
  } finally {
    yield put(setIsLoading(false));
  }
}

function* runMakeOffer(action) {
  try {
    const { price, tokenID, collectionAddress } = action.payload;

    yield put(setIsLoading(true));

    yield call(makeOfferToOwner, collectionAddress, tokenID, price);

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
    toast.error("An unexpected error occurred.");
  } finally {
    yield put(setIsLoading(false));
  }
}

function* runDelistItem(action) {
  try {
    const { listingId, collectionAddress, tokenID } = action.payload;

    yield put(setIsLoading(true));

    // unlist from Blockchain
    yield call(deListItem, listingId);

    // unlist from DB
    yield call(nftApi.setNftToUnlisted, {
      collectionAddress,
      tokenID,
    });

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
    toast.error("An unexpected error occurred.");
  } finally {
    yield put(setIsLoading(false));
  }
}

function* runAcceptOffer(action) {
  try {
    const { collectionAddress, tokenID } = action.payload;

    yield put(setIsLoading(true));

    // unlist from Blockchain
    yield call(acceptOffer, collectionAddress, tokenID);

    // unlist from DB
    yield call(nftApi.setNftToUnlisted, {
      collectionAddress,
      tokenID,
    });

    const response = yield call(nftApi.getNftCall, collectionAddress, tokenID);

    // putting the NFT details
    yield put(setIsLoading(false));
    action.onSuccess(response.data);
  } catch (error) {
    console.log("error ", error);
    toast.error("An unexpected error occurred.");
  } finally {
    yield put(setIsLoading(false));
  }
}

function* runPlaceBid(action) {
  try {
    const { auctionId, price, collectionAddress, tokenID } = action.payload;

    yield put(setIsLoading(true));

    // unlist from Blockchain
    yield call(placeBid, auctionId, price);

    const response = yield call(nftApi.getNftCall, collectionAddress, tokenID);

    // putting the NFT details
    yield put(setIsLoading(false));
    action.onSuccess(response.data);
  } catch (error) {
    console.log("error ", error);
    toast.error("An unexpected error occurred.");
  } finally {
    yield put(setIsLoading(false));
  }
}

function* runListFixedPrice(action) {
  try {
    const { collectionAddress, tokenID, fixedPrice } = action.payload;

    yield put(setIsLoading(true));

    // unlist from Blockchain
    const listingId = yield call(
      createListing,
      collectionAddress,
      tokenID,
      fixedPrice
    );

    // Mark the NFT as Listed in DB
    yield call(nftApi.setNftToListed, {
      collectionAddress,
      tokenID,
      listingType: FIXED_PRICE,
      price: fixedPrice,
      listingId: Number(listingId),
    });

    const response = yield call(nftApi.getNftCall, collectionAddress, tokenID);

    // putting the NFT details
    yield put(setIsLoading(false));
    action.onSuccess(response.data);
  } catch (error) {
    console.log("error ", error);
    toast.error("An unexpected error occurred.");
  } finally {
    yield put(setIsLoading(false));
  }
}

function* runListingAuction(action) {
  try {
    const { collectionAddress, tokenID, auctionPrice, endAuction } =
      action.payload;

    yield put(setIsLoading(true));

    const auctionId = yield call(
      createAuction,
      collectionAddress,
      tokenID,
      auctionPrice,
      endAuction
    );

    yield call(nftApi.setNftToListed, {
      collectionAddress,
      tokenID,
      auctionId,
      endAuction,
      listingType: AUCTION,
    });

    const nftDetails = yield call(
      nftApi.getNftCall,
      collectionAddress,
      tokenID
    );

    yield put(setIsLoading(false));
    action.onSuccess(nftDetails.data);
  } catch (error) {
    console.log("error ", error);
    toast.error("An unexpected error occurred.");
  } finally {
    yield put(setIsLoading(false));
  }
}

function* runHandleRefund(action) {
  const { auctionId, collectionAddress, tokenID } = action.payload;

  try {
    yield put(setIsLoading(true));

    yield call(refundNft, auctionId);

    yield call(nftApi.setNftToUnlisted, {
      collectionAddress,
      tokenID,
    });
    // get the nft details
    const response = yield call(nftApi.getNftCall, collectionAddress, tokenID);

    yield put(setIsLoading(false));
    action.onSuccess(response.data);
  } catch (error) {
    console.log("error ", error);
    toast.error("An unexpected error occurred.");
  } finally {
    yield put(setIsLoading(false));
  }
}

function* runHandleClaimNFT(action) {
  const { auctionId, collectionAddress, tokenID } = action.payload;

  try {
    yield put(setIsLoading(true));

    yield call(claimNFT, auctionId);

    yield call(nftApi.setNftToUnlisted, {
      collectionAddress,
      tokenID,
    });
    // get the nft details
    const response = yield call(nftApi.getNftCall, collectionAddress, tokenID);
    // putting the NFT details
    yield put(setIsLoading(false));
    action.onSuccess(response.data);
  } catch (error) {
    console.log("error ", error);
    toast.error("An unexpected error occurred.");
  } finally {
    yield put(setIsLoading(false));
  }
}

function* runHandleClaimToken(action) {
  const { auctionId, collectionAddress, tokenID } = action.payload;

  try {
    yield put(setIsLoading(true));

    yield call(claimToken, auctionId);

    yield call(nftApi.setNftToUnlisted, {
      collectionAddress,
      tokenID,
    });
    // get the nft details
    const response = yield call(nftApi.getNftCall, collectionAddress, tokenID);

    // putting the NFT details
    yield put(setIsLoading(false));
    action.onSuccess(response.data);
  } catch (error) {
    console.log("error ", error);
    toast.error("An unexpected error occurred.");
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
};
