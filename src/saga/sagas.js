import { all } from "redux-saga/effects";
import { acceptOfferSaga, buyNft, claimNFTSaga, claimTokenSaga, delistItem, listFixedPrice, listingAuction, makeOffer, placeBidSaga, refund } from "./blockchain.js/blockChainInteractorSaga";
import {
  importCollectionSaga,
  loadAccountCollectionsSaga,
  loadAccountNtsSaga,
  loadCollection,
  loadMintCollection,
  loadPopularCollectionSaga,
  loadSearcheableCollectionSaga,
  updateCollectionInformationSaga,
} from "./collectionSaga";
import { loadListedNfts, mintNft, mintNftSaga, transfertTokenSaga } from "./nftSaga";
import { loadUser, updateProfileForUser } from "./userSaga";

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
    importCollectionSaga(),
    loadCollection(),
    updateCollectionInformationSaga(),
    updateProfileForUser(),
    refund(),
    claimNFTSaga(),
    claimTokenSaga(),
    mintNftSaga(),
    loadMintCollection(),
    transfertTokenSaga()
  ]);
}

export default watchAll;
