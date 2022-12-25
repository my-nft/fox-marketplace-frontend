import { setIsLoading, setListedNfts } from "../redux/nftReducer";
import { LOAD_LISTED_NFTS, MINT_NFT } from "./actions";
import * as nftApi from "../api/nftApi";
import { call, put, takeLatest } from "redux-saga/effects";
import { toast } from "react-toastify";
import { signWallet } from "./userSaga";
import { mintNft } from "../services/createNFT";
import { updateImportCollectionCall } from "../api/collectionApi";



function* runMintNft(action) {

  try {
    yield put(setIsLoading(true));
    const token = yield call(signWallet);
    const { collectionAddress, image, ...rest } = action.payload;
    // ipfs + minting
    yield call(mintNft, {
      collectionAddress, nft: rest, image, token
    });
    
  } catch (error) {
 
  } finally {
    yield put(setIsLoading(false));
  }
}

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

function* loadListedNfts() {
  yield takeLatest(LOAD_LISTED_NFTS, loadListedNftsCall);
}


function* mintNftSaga() {
  yield takeLatest(MINT_NFT, runMintNft);
}


export { loadListedNfts, mintNftSaga };
