import { toast } from "react-toastify";
import { call, takeLatest } from "redux-saga/effects";
import { sendInscription, getInscriptionBalance } from "../api/utilsApi.js";
import { requestInscription } from "../services/bitCoinInscription.js";
import { REQUEST_INSCRIPTION } from "./actions.js";
import { signWallet } from "./userSaga";

function* runRequestInscription(action) {
  try {
    const token = yield call(signWallet);

    //verify if the balance is alimented correctly for the requested file
    const balanceInscription = yield call(getInscriptionBalance, token);

    if (!balanceInscription?.isConditionFilled) {
      toast.error("Please try the minting process later");
      action.onError("Balance - Error while requesting inscription");
      return;
    }

    const { imageFile, fileSize, estimatedCost, receiverAddress } =
      action.payload;
    yield call(requestInscription, fileSize, estimatedCost);

    const inscriptionRes = yield call(sendInscription, {
      imageFile,
      fileSize,
      receiverAddress,
      token,
    });

    action.onSuccess(inscriptionRes.data);
  } catch (error) {
    console.error(error);
    toast.error("Error while requesting inscription");
    action.onError(error);
  }
}

function* requestInscriptionSaga() {
  yield takeLatest(REQUEST_INSCRIPTION, runRequestInscription);
}

export { requestInscriptionSaga };
