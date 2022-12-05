import { all } from "redux-saga/effects";
import {
  loadCollectionNfts,
  loadPopularCollectionSaga,
  loadSearcheableCollectionSaga,
  showNftDetails,
} from "./collectionSaga";
import { loadUser } from "./userSaga";

function* watchAll() {
  yield all([
    loadUser(),
    loadPopularCollectionSaga(),
    loadSearcheableCollectionSaga(),
    loadCollectionNfts(),
    showNftDetails(),
  ]);
}

export default watchAll;
