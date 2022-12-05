import { toast } from "react-toastify";
import { call, put, takeLatest } from "redux-saga/effects";
import * as api from "../api/collectionApi";
import * as tokenApi from "../api/nftApi";

import {
  setMostPopularCollections,
  setIsLoadingMspl,
  setSearcheableCollections,
  setIsLoadingSearcheableCollection,
  setIsLoadingMarketPlaceNfts,
  setMarketPlaceNfts,
} from "../redux/collectionReducer";
import { setIsLoading, setNftDetails } from "../redux/nftReducer";
import {
  LOAD_MARKETPLACE_NFT,
  LOAD_MOST_POPULAR_COLLECTION,
  LOAD_NFT_DETAIL,
  LOAD_SEARCHABLE_COLLECTION,
} from "./actions";

function* loadPopularCollection(action) {
  try {
    yield put(setIsLoadingMspl(true));

    const response = yield call(api.getCollectionsCall, action.payload);

    yield put(setMostPopularCollections(response.data));
  } catch (error) {
    console.log("error ", error.response.status);
    toast.error("An unexpected error occurred.");
  } finally {
    yield put(setIsLoadingMspl(false));
  }
}

function* loadSearcheableCollection(action) {
  try {
    yield put(setIsLoadingSearcheableCollection(true));

    const response = yield call(api.getCollectionsCall, action.payload);

    yield put(setSearcheableCollections(response.data));
  } catch (error) {
    console.log("error ", error.response.status);
    toast.error("An unexpected error occurred.");
  } finally {
    yield put(setIsLoadingSearcheableCollection(false));
  }
}

function* loadMarketPlaceNfts(action) {
  try {
    yield put(setIsLoadingMarketPlaceNfts(true));
    const { collectionAddress, ...rest } = action.payload;
    const response = yield call(
      api.getCollectionNftsCall,
      collectionAddress,
      rest
    );
    yield put(setMarketPlaceNfts(response.data));
  } catch (error) {
    console.log("error ", error.response.status);
    toast.error("An unexpected error occurred.");
  } finally {
    yield put(setIsLoadingMarketPlaceNfts(false));
  }
}

function* loadNftDetails(action) {
  try {
    yield put(setIsLoading(true));
    const { collectionAddress, tokenID } = action.payload;
    const response = yield call(
      tokenApi.getNftCall,
      collectionAddress,
      tokenID
    );
    yield put(setNftDetails(response.data));
  } catch (error) {
    console.log("error ", error.response.status);
    toast.error("An unexpected error occurred.");
  } finally {
    yield put(setIsLoading(false));
  }
}

// Starts fetchUser on each dispatched USER_FETCH_REQUESTED action
// Allows concurrent fetches of user
function* loadPopularCollectionSaga() {
  yield takeLatest(LOAD_MOST_POPULAR_COLLECTION, loadPopularCollection);
}

function* loadSearcheableCollectionSaga() {
  yield takeLatest(LOAD_SEARCHABLE_COLLECTION, loadSearcheableCollection);
}

function* loadCollectionNfts() {
  yield takeLatest(LOAD_MARKETPLACE_NFT, loadMarketPlaceNfts);
}

function* showNftDetails() {
  yield takeLatest(LOAD_NFT_DETAIL, loadNftDetails);
}

export {
  loadPopularCollectionSaga,
  loadSearcheableCollectionSaga,
  loadCollectionNfts,
  showNftDetails,
};
