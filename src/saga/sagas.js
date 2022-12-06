import { all } from "redux-saga/effects";
import {
  loadAccountData,
  loadPopularCollectionSaga,
  loadSearcheableCollectionSaga,
  showNftDetails,
} from "./collectionSaga";
import { loadListedNfts } from "./nftSaga";
import { loadUser } from "./userSaga";

function* watchAll() {
  yield all([
    loadUser(),
    loadPopularCollectionSaga(),
    loadSearcheableCollectionSaga(),
    showNftDetails(),
    loadAccountData(),
    loadListedNfts()
  ]);
}

export default watchAll;
