import { all } from "redux-saga/effects";
import { acceptOfferSaga, buyNft, delistItem, makeOffer } from "./blockchain.js/blockChainInteractorSaga";
import {
  loadAccountData,
  loadPopularCollectionSaga,
  loadSearcheableCollectionSaga,
  showNftDetails,
} from "./collectionSaga";
import { loadListedNfts, removeListingNftSaga } from "./nftSaga";
import { loadUser } from "./userSaga";

function* watchAll() {
  yield all([
    loadUser(),
    loadPopularCollectionSaga(),
    loadSearcheableCollectionSaga(),
    showNftDetails(),
    loadAccountData(),
    loadListedNfts(),
    removeListingNftSaga(),
    buyNft(),
    makeOffer(),
    delistItem(),
    acceptOfferSaga()
  ]);
}

export default watchAll;
