import { toast } from "react-toastify";
import { call, delay, put, takeLatest } from "redux-saga/effects";
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
  setCollectionDetails,
} from "../redux/collectionReducer";
import { mintCollection } from "../services/createCollection";
import {
  IMPORT_COLLECTION,
  LOAD_MOST_POPULAR_COLLECTION,
  LOAD_SEARCHABLE_COLLECTION,
  LOAD_ACCOUNT_NFTS,
  LOAD_ACCOUNT_COLLECTIONS,
  LOAD_COLLECTION,
  UPDATE_COLLECTION,
  MINT_COLLECTION,
} from "./actions";
import { signWallet } from "./userSaga";

function* importCollection(action) {
  try {
    yield put(setCollectionIsLoading(true));
    const { collectionAddress } = action.payload;
    const token = yield call(signWallet);
    console.log("the token is", token);
    yield call(api.importCollectionCall, collectionAddress, token);
    yield delay(3000);

    yield put(setCollectionIsLoading(false));
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

    const { data } = response;

    yield put(setSearcheableCollections(data.content));
  } catch (error) {
    console.log("error ", error.response.status);
    toast.error("An unexpected error occurred.");
  } finally {
    yield put(setIsLoadingSearcheableCollection(false));
  }
}

function* runLoadCollection(action) {
  try {
    const { collectionAddress } = action.payload;
    yield put(setCollectionIsLoading(true));
    let response = yield call(api.getCollectionByAddress, collectionAddress);
    yield delay(1000);

    yield put(setCollectionDetails(response.data));
    yield put(setCollectionIsLoading(false));
    action.onSuccess();
  } catch (error) {
    console.log(error);
    toast.error("An unexpected error occurred.");
  } finally {
    yield put(setCollectionIsLoading(false));
  }
}

function* runMintCollection(action) {
  try {
    yield put(setCollectionIsLoading(true));

    const token = yield call(signWallet);

    const { data, image } = action.payload;
    let collectionAddress = yield call(mintCollection, {
      name: data.name,
      symbol: data.symbol
    });

    yield call(api.importCollectionCall, collectionAddress, token, true);

    yield call(
      api.updateCollection,
      collectionAddress,
      {
        image,
        collection: data,
      },
      token
    );
    yield delay(1500);

    yield put(setCollectionIsLoading(false));

    action.onSuccess(collectionAddress);


  } catch (error) {
    console.log(error);
    toast.error("An unexpected error occurred.");
  } finally {
    yield put(setCollectionIsLoading(false));
  }
}

function* updateCollectionInformation(action) {
  try {
    const { collectionAddress, image, banner, data } = action.payload;
    const token = yield call(signWallet);

    yield call(
      api.updateCollection,
      collectionAddress,
      {
        image,
        banner,
        collection: data,
      },
      token
    );

    yield delay(1000);
    toast.success("Collection updated successfully");
    action.onSuccess();
  } catch (error) {
    console.log(error);
    toast.error("An unexpected error occurred.");
    action.onError();
  }
}

function* loadAccountCollections(action) {
  console.log("LOAD ACCOUNT COLLECTIONS");
  try {
    yield put(setIsLoadingAccount(true));
    const {ownerAddress, page, numberElements, filter} = action.payload;
    console.log("SAGA CALL", action.payload);

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
  console.log("LOAD ACCOUNT NFTS");

  const {
    creatorAddress,
    ownerAddress,
    page,
    numberElements,
    categories,
    searchPrompt,
    status,
    minPrice,
    maxPrice,
    buyToken,
    sortBy,
    isListed,
    collectedOnly,
  } = action.payload;

  try {
    yield put(setIsLoadingAccount(true));

    const response = yield call(tokenApi.getNftsCall, {
      creatorAddress,
      ownerAddress,
      page,
      numberElements,
      categories,
      searchPrompt,
      status,
      minPrice,
      maxPrice,
      buyToken,
      sortBy,
      isListed,
      collectedOnly
    });

    yield put(setAccountNfts(response.data));
  } catch (error) {
    console.log("error ", error.response.status);
    toast.error("An unexpected error occurred.");
  } finally {
    yield put(setIsLoadingAccount(false));
  }
}

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

function* loadAccountNtsSaga() {
  yield takeLatest(LOAD_ACCOUNT_NFTS, loadAccountNfts);
}

function* loadAccountCollectionsSaga() {
  yield takeLatest(LOAD_ACCOUNT_COLLECTIONS, loadAccountCollections);
}

function* updateCollectionInformationSaga() {
  yield takeLatest(UPDATE_COLLECTION, updateCollectionInformation);
}

function* loadCollection() {
  yield takeLatest(LOAD_COLLECTION, runLoadCollection);
}

function* loadMintCollection() {
  yield takeLatest(MINT_COLLECTION, runMintCollection);
}

export {
  loadPopularCollectionSaga,
  loadSearcheableCollectionSaga,
  loadAccountNtsSaga,
  loadAccountCollectionsSaga,
  updateCollectionInformationSaga,
  importCollectionSaga,
  loadCollection,
  loadMintCollection
};
