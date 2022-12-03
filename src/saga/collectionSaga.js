import { toast } from "react-toastify";
import { call, put, takeLatest } from "redux-saga/effects";
import * as api from "../api/collectionApi";
import {
  setMostPopularCollections,
  setIsLoadingMspl,
  setSearcheableCollections,
  setIsLoadingSearcheableCollection,
} from "../redux/collectionReducer";
import { LOAD_MOST_POPULAR_COLLECTION, LOAD_SEARCHABLE_COLLECTION } from "./actions";

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

// Starts fetchUser on each dispatched USER_FETCH_REQUESTED action
// Allows concurrent fetches of user
function* loadPopularCollectionSaga() {
  yield takeLatest(LOAD_MOST_POPULAR_COLLECTION, loadPopularCollection);
}


function* loadSearcheableCollectionSaga() {
  yield takeLatest(LOAD_SEARCHABLE_COLLECTION, loadSearcheableCollection);
}


export { loadPopularCollectionSaga, loadSearcheableCollectionSaga };
