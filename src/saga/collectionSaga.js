import { toast } from "react-toastify";
import { call, cps, put, takeLatest } from "redux-saga/effects";
import * as api from "../api/collectionApi";
import * as tokenApi from "../api/nftApi";
import {
  setAccountCollections,
  setAccountNfts,
  setIsLoadingAccount,
} from "../redux/accountReducer";

import {
  setMostPopularCollections,
  setIsLoadingMspl,
  setSearcheableCollections,
  setIsLoadingSearcheableCollection,
  setIsLoading as setCollectionIsLoading,
} from "../redux/collectionReducer";
import {
  setIsLoading,
  setListedNfts,
  setNftDetails,
} from "../redux/nftReducer";
import {
  IMPORT_COLLECTION,
  LOAD_MARKET_PLACE,
  LOAD_MOST_POPULAR_COLLECTION,
  LOAD_NFT_DETAIL,
  LOAD_SEARCHABLE_COLLECTION,
  LOAD_ACCOUNT_NFTS,
  LOAD_ACCOUNT_COLLECTIONS,
} from "./actions";

function* importCollection(action) {
  try {
    yield put(setCollectionIsLoading(true));
    const { collectionAddress } = action.payload;
    yield call(api.importCollectionCall, collectionAddress);
    action.onSuccess();
  } catch (error) {
    console.log("error ", error.response.status);
    toast.error("An unexpected error occurred.");
  } finally {
    yield put(setCollectionIsLoading(false));
  }
}

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

function* runLoadMarketPlaceAll(action) {
  try {
    const { page, numberElements } = action.payload;
    yield put(setIsLoading(true));

    // loading most popular collections
    let response = yield call(api.getCollectionsCall, action.payload);
    yield put(setMostPopularCollections(response.data));

    // loading searchable collections
    response = yield call(api.getCollectionsCall, action.payload);
    yield put(setSearcheableCollections(response.data));

    //loading listedNfts
    response = yield call(tokenApi.getListedNfts, page, numberElements);
    yield put(setListedNfts(response.data));
  } catch (error) {
    console.log(error);
    toast.error("An unexpected error occurred.");
  } finally {
    yield put(setIsLoading(false));
  }
}

function* loadNftDetails(action) {
  try {
    yield put(setIsLoading(true));
    const { collectionAddress, tokenID, onSuccess = {} } = action.payload;
    const response = yield call(
      tokenApi.getNftCall,
      collectionAddress,
      tokenID
    );
    yield put(setNftDetails(response.data));

    action.onSuccess();
  } catch (error) {
    console.log("error ", error.response.status);
    toast.error("An unexpected error occurred.");
  } finally {
    yield put(setIsLoading(false));
  }
}

function* loadAccountCollections(action) {
  console.log("LOAD ACCOUNT COLLECTIONS")
  try {
    yield put(setIsLoadingAccount(true));
    const { ownerAddress, page, numberElements, filter } = action.payload;
    const collectionsResponse = yield call(
      api.getAccountCollections,
      ownerAddress,
      page,
      numberElements,
      filter
    );
    yield put(setAccountCollections(collectionsResponse.data));
  } catch (error) {
    console.log("error ", error.response.status);
    toast.error("An unexpected error occurred.");
  } finally {
    yield put(setIsLoadingAccount(false));
  }
}

function* loadAccountNfts(action) {
  console.log("LOAD ACCOUNT NFTS")

  const {
    creatorAddress,
    ownerAddress,
    isListed,
    collectedOnly,
    page,
    numberElements,
  } = action.payload;

  try {

    yield put(setIsLoadingAccount(true));

    const response = yield call(tokenApi.getNftsCall, {
      creatorAddress,
      ownerAddress,
      isListed,
      collectedOnly,
      page,
      numberElements,
    });

    yield put(setAccountNfts(response.data));
  } catch (error) {
    console.log("error ", error.response.status);
    toast.error("An unexpected error occurred.");
  } finally {
    yield put(setIsLoadingAccount(false));
  }
}

/*
function* loadAccountDataFromAPI(action) {
  try {

    console.log("##########-----------------------------------###########")

    const { connectedWallet, page, numberElements } = action.payload;

    yield put(setIsLoadingAccount(true));

    yield call(loadMyCollections, { ownerAddress : connectedWallet, page, numberElements } );

    console.log("##########-----------------------------------###########")

    // load myNfts
    const myNfts = yield call(loadNfts, {
      ownerAddress: connectedWallet,
      page,
      numberElements,
    });

    // load nfts that i created
    const myCreatedNfts = yield call(loadNfts, {
      creatorAddress: connectedWallet,
      page,
      numberElements,
    });

    // load nfts that i collected
    const myCollectedNfts = yield call(loadNfts, {
      ownerAddress: connectedWallet,
      page,
      numberElements,
      collectedOnly: true,
    });

    // load my listed Nfts
    const myListedNfts = yield call(loadNfts, {
      ownerAddress: connectedWallet,
      page,
      numberElements,
      isListed: true,
    });

    yield put(setAccountNfts(myNfts));
    yield put(setAccountCreated(myCreatedNfts));
    yield put(setAccountCollected(myCollectedNfts));
    yield put(setAccountListed(myListedNfts));
  } catch (error) {
    console.log("error ", error.response.status);
    toast.error("An unexpected error occurred.");
  } finally {
    yield put(setIsLoadingAccount(false));
  }
}
*/

function* importCollectionSaga() {
  yield takeLatest(IMPORT_COLLECTION, importCollection);
}

// Starts fetchUser on each dispatched USER_FETCH_REQUESTED action
// Allows concurrent fetches of user
function* loadPopularCollectionSaga() {
  yield takeLatest(LOAD_MOST_POPULAR_COLLECTION, loadPopularCollection);
}

function* loadSearcheableCollectionSaga() {
  yield takeLatest(LOAD_SEARCHABLE_COLLECTION, loadSearcheableCollection);
}

function* showNftDetails() {
  yield takeLatest(LOAD_NFT_DETAIL, loadNftDetails);
}

function* loadAccountNtsSaga() {
  yield takeLatest(LOAD_ACCOUNT_NFTS, loadAccountNfts);
}

function* loadAccountCollectionsSaga() {
  yield takeLatest(LOAD_ACCOUNT_COLLECTIONS, loadAccountCollections);
}

function* loadMarketPlaceAll() {
  yield takeLatest(LOAD_MARKET_PLACE, runLoadMarketPlaceAll);
}

export {
  loadPopularCollectionSaga,
  loadSearcheableCollectionSaga,
  showNftDetails,
  loadAccountNtsSaga,
  loadAccountCollectionsSaga,
  loadMarketPlaceAll,
  importCollectionSaga,
};
