import { toast } from 'react-toastify';
import { call, takeLatest } from 'redux-saga/effects';
import { requestInscription } from "../services/bitCoinInscription.js";
import { REQUEST_INSCRIPTION } from './actions.js';
import { signWallet } from "./userSaga";

function* runRequestInscription(action) {
    try {
        const token = yield call(signWallet);
        const { imageFile, fileSize, estimateCost, receiverAddress } = action.payload;
        yield call(requestInscription, imageFile, fileSize, estimateCost, receiverAddress, token);
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
