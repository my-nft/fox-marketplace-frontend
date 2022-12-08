import { setIsLoading, setNftDetails } from "../../redux/nftReducer";
import * as nftApi from "../../api/nftApi";
import { call, put, takeLatest } from "redux-saga/effects";
import { toast } from "react-toastify";
import {
  buyItem,
  deListItem,
  makeOfferToOwner,
  acceptOffer
} from "../../services/listingNft";
import { ACCEPT_OFFER, BUY_NFT, DELIST_ITEM, MAKE_OFFER } from "./blockChainActions";

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

    //yield put(setListedNfts(response.data));
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


export { buyNft, makeOffer, delistItem, acceptOfferSaga };
