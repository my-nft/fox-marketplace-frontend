import { all } from "redux-saga/effects";
import { acceptOfferSaga, buyNft, claimNFTSaga, claimTokenSaga, delistItem, listFixedPrice, listingAuction, makeOffer, placeBidSaga, refund } from "./blockchain.js/blockChainInteractorSaga";
import {
  importCollectionSaga,
  loadAccountCollectionsSaga,
  loadAccountNtsSaga,
  loadCollection,
  loadMarketPlaceAll,
  loadPopularCollectionSaga,
  loadSearcheableCollectionSaga,
  updateCollectionInformationSaga,
} from "./collectionSaga";
import { loadListedNfts } from "./nftSaga";
import { loadUser } from "./userSaga";

function* watchAll() {
  yield all([
    loadUser(),
    loadPopularCollectionSaga(),
    loadSearcheableCollectionSaga(),
    loadAccountNtsSaga(),
    loadAccountCollectionsSaga(),
    loadListedNfts(),
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
    updateCollectionInformationSaga(),
    refund(),
    claimNFTSaga(),
    claimTokenSaga()
  ]);
}

export default watchAll;
