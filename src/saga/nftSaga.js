import { setIsLoading, setListedNfts, setNftDetails } from "../redux/nftReducer";
import { LOAD_LISTED_NFTS, REMOVE_LISTING_FROM_NFT } from "./actions";
import * as nftApi from "../api/nftApi";
import { call, put, takeLatest } from "redux-saga/effects";
import { toast } from "react-toastify";

function* loadListedNftsCall(action) {
  try {
    yield put(setIsLoading(true));
    const { page, numberElements } = action.payload;
    const response = yield call(nftApi.getListedNfts, page, numberElements);
    yield put(setListedNfts(response.data));
  } catch (error) {
    console.log("error ", error.response.status);
    toast.error("An unexpected error occurred.");
  } finally {
    yield put(setIsLoading(false));
  }
}

function* removeListingNft(action) {
  try {
    yield put(setIsLoading(true));
    const { collectionAddress, tokenID } = action.payload;
    // setting to unlisted
    yield call(nftApi.setNftToUnlisted, {
      collectionAddress,
      tokenID,
    });
    // get the nft details
    const response = yield call(
      nftApi.getNftCall,
      collectionAddress,
      tokenID
    );
    // putting the NFT details
    yield put(setNftDetails(response.data));

  } catch (error) {
    console.log("error ", error.response.status);
    toast.error("An unexpected error occurred.");
  } finally {
    yield put(setIsLoading(false));
  }
}

function* loadListedNfts() {
  yield takeLatest(LOAD_LISTED_NFTS, loadListedNftsCall);
}

function* removeListingNftSaga() {
  yield takeLatest(REMOVE_LISTING_FROM_NFT, removeListingNft);
}

export { loadListedNfts, removeListingNftSaga };
