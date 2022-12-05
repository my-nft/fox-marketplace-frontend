import { setIsLoading, setListedNfts } from "../redux/nftReducer";
import { LOAD_LISTED_NFTS } from "./actions";
import * as nftApi from "../api/nftApi";
import { call, put, takeLatest } from "redux-saga/effects";
import { toast } from "react-toastify";

function* loadListedNftsCall(action){
    try{
      yield put(setIsLoading(true))
      const { page, numberElements} = action.payload;
      const response = yield call(nftApi.getListedNfts, page, numberElements)
      yield put(setListedNfts(response.data))  
    }
    catch(error){
      console.log("error ", error.response.status);
      toast.error("An unexpected error occurred.");
    } finally{
      yield put(setIsLoading(false))
    }
  }

function* loadListedNfts(){
    yield takeLatest(LOAD_LISTED_NFTS, loadListedNftsCall)
  }


  export {
    loadListedNfts
  }