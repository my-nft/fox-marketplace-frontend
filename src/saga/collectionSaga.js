import { toast } from "react-toastify";
import { call, put, takeLatest } from "redux-saga/effects";
import * as api from "../api/collectionApi";
import {
  setMostPopularCollections,
  setIsLoadingMspl,
} from "../redux/collectionReducer";
import { LOAD_COLLECTION } from "./actions";

function* loadCollection(action) {
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

// Starts fetchUser on each dispatched USER_FETCH_REQUESTED action
// Allows concurrent fetches of user
function* loadCollectionSaga() {
  yield takeLatest(LOAD_COLLECTION, loadCollection);
}

export { loadCollectionSaga };
