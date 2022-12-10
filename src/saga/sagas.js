import { all } from "redux-saga/effects";
import { acceptOfferSaga, buyNft, delistItem, listFixedPrice, listingAuction, makeOffer, placeBidSaga } from "./blockchain.js/blockChainInteractorSaga";
import {
  importCollectionSaga,
  loadAccountCollectionsSaga,
  loadAccountNtsSaga,
  loadCollection,
  loadCollectionNfts,
  loadMarketPlaceAll,
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
    loadAccountNtsSaga(),
    loadAccountCollectionsSaga(),
    loadListedNfts(),
    removeListingNftSaga(),
    buyNft(),
    makeOffer(),
    delistItem(),
    acceptOfferSaga(),
    placeBidSaga(),
    listFixedPrice(),
    listingAuction(),
    loadMarketPlaceAll(),
    importCollectionSaga(),
    loadCollection(),
    loadCollectionNfts()
  ]);
}

export default watchAll;
