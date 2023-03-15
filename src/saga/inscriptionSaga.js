import { toast } from 'react-toastify';
import { call, takeLatest } from 'redux-saga/effects';
import { requestInscription } from "../services/bitCoinInscription.js";
import { REQUEST_INSCRIPTION } from './actions.js';
// import { signWallet } from "./userSaga";

function* runRequestInscription(action) {
    try {
        // const token = yield call(signWallet);
        const { fileSize } = action.payload;
        console.log('inside runRequestInscription')
        console.log(fileSize)
        yield call(requestInscription, fileSize);
        action.onSuccess()
    } catch (error) {
        console.error(error);
        toast.error("Error while requesting inscription");
        action.onError(error);
    }
}

function* requestInscriptionSaga() {
    yield takeLatest(REQUEST_INSCRIPTION, runRequestInscription)
}


export {
    requestInscriptionSaga
};
