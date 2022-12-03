import { all } from "redux-saga/effects";
import {
  loadCollectionNfts,
  loadPopularCollectionSaga,
  loadSearcheableCollectionSaga,
} from "./collectionSaga";
import { loadUser } from "./userSaga";

function* watchAll() {
  yield all([
    loadUser(),
    loadPopularCollectionSaga(),
    loadSearcheableCollectionSaga(),
    loadCollectionNfts(),
  ]);
}

export default watchAll;
