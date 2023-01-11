import { setIsLoading, setListedNfts } from "../redux/nftReducer";
import { LOAD_LISTED_NFTS, MINT_NFT, TRANSFERT_NFT } from "./actions";
import * as nftApi from "../api/nftApi";
import { call, put, select, takeLatest } from "redux-saga/effects";
import { toast } from "react-toastify";
import { signWallet } from "./userSaga";
import { mintNft } from "../services/createNFT";
import {
  importCollectionToken,
} from "../api/collectionApi";
import { transfertToken } from "../services/listingNft";
import { EVENT_TRANSFERT_TOKEN } from "../utils/foxConstantes";
import { selectCurrentWallet } from "../redux/userReducer";
import { postTraceTransaction } from "../api/utilsApi";

function* runMintNft(action) {
  try {
    console.log("Minting NFT");
    yield put(setIsLoading(true));
    console.log("Signing wallet");
    const token = yield call(signWallet);
    console.log("After wallet");
    console.log("Calling API");
    const { collectionAddress, image, ...rest } = action.payload;
    // ipfs + minting
    const { tokenID, collectionAddress: calculAddress } = yield call(mintNft, {
      collectionAddress,
      nft: rest,
      image,
      token,
    });

    // import the specific token
    yield call(importCollectionToken, calculAddress, tokenID, token);
    yield put(setIsLoading(false));

    action.onSuccess(calculAddress, tokenID);
  } catch (error) {
    yield put(setIsLoading(false));
    action?.onError(error);
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


function* runTransfertToken(action) {
  try {
    yield put(setIsLoading(true));

    const token = yield call(signWallet);

    const { tokenID, collectionAddress, to } = action.payload;

    const connectedWallet = yield select(selectCurrentWallet);
    
    const tsxId = yield call(transfertToken, collectionAddress, tokenID, to);

    yield call(
      postTraceTransaction,
      {
        fromAddress: connectedWallet,
        toAddress: to,
        price : undefined,
        collectionAddress,
        tokenID,
        event: EVENT_TRANSFERT_TOKEN,
        transactionId: tsxId,
      },
      token
    );

    const nftDetails = yield call(
      nftApi.getNftCall,
      collectionAddress,
      tokenID
    );

    console.log("Loading success")

    // putting the NFT details
    action.onSuccess(nftDetails.data);
    yield put(setIsLoading(false));

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

function* transfertTokenSaga() {
  yield takeLatest(TRANSFERT_NFT, runTransfertToken)
}

export { loadListedNfts, mintNftSaga, transfertTokenSaga };
