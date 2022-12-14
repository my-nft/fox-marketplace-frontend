import { setIsLoading, setNftDetails } from "../../redux/nftReducer";
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
} from "../../services/listingNft";
import {
  ACCEPT_OFFER,
  BUY_NFT,
  DELIST_ITEM,
  LISTING_AUCTION,
  LISTING_FIXED_PRICE,
  MAKE_OFFER,
  PLACE_BID,
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

    yield put(setNftDetails(nftDetails.data));
  } catch (error) {
    console.log("error ", error);
    toast.error("An unexpected error occurred.");
  } finally {
    yield put(setIsLoading(false));
  }
}

function* runMakeOffer(action) {
  try {
    const { listingId, price, tokenID, collectionAddress } = action.payload;

    yield put(setIsLoading(true));

    yield call(makeOfferToOwner, listingId, price);

    const nftDetails = yield call(
      nftApi.getNftCall,
      collectionAddress,
      tokenID
    );

    yield put(setNftDetails(nftDetails.data));
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

    yield put(setNftDetails(nftDetails.data));
  } catch (error) {
    console.log("error ", error);
    toast.error("An unexpected error occurred.");
  } finally {
    yield put(setIsLoading(false));
  }
}

function* runAcceptOffer(action) {
  try {
    const { listingId, collectionAddress, tokenID } = action.payload;

    yield put(setIsLoading(true));

    // unlist from Blockchain
    yield call(acceptOffer, listingId);

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

    yield put(setNftDetails(nftDetails.data));
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

    const nftDetails = yield call(
      nftApi.getNftCall,
      collectionAddress,
      tokenID
    );

    yield put(setNftDetails(nftDetails.data));
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

    const nftDetails = yield call(
      nftApi.getNftCall,
      collectionAddress,
      tokenID
    );

    yield put(setNftDetails(nftDetails.data));
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
      listingType: AUCTION
    });

    const nftDetails = yield call(
      nftApi.getNftCall,
      collectionAddress,
      tokenID
    );

    yield put(setNftDetails(nftDetails.data));

  } catch (error) {
    console.log("error ", error);
    toast.error("An unexpected error occurred.");
  } finally {
    yield put(setIsLoading(false));
  }
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
};
