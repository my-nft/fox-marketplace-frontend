import { call, put, select, takeLatest } from "redux-saga/effects";
import * as api from "../api/userApi";
import {
  selectCurrentWallet,
  setCurrentUser,
  setCurrentWallet,
  setLoading,
  setToken,
} from "../redux/userReducer";
import { LOAD_USER, UPDATE_PROFILE } from "./actions";
import { signIn, signUp } from "../interactors/authInteractor";
import { toast } from "react-toastify";

// Worker saga will be fired on USER_FETCH_REQUESTED actions
function* getConnectedUser(action) {
  const address = action.payload;
  try {
    yield put(setLoading(true));
    const response = yield call(api.getUserByAddress, address);
    yield put(setCurrentUser(response.data));
    yield put(setCurrentWallet(address));
  } catch (error) {
    console.log("error ", error.response.status);
    console.log("CREATING NEW USER?", address)
    console.log("STATUS", error.response.status)
    // userNotFound => Nothing to do here
    if (error.response.status === 404) {
      console.log("registration of a new user");
      // signUp an new user
      const response = yield call(signUp, address);
      const { user, token } = response;
      yield put(setCurrentUser(user));
      yield put(setToken(token));
    }
  } finally {
    yield put(setLoading(false));
  }
}

function* updateUserProfile(action) {
  try {
    const {
      username,
      bio,
      email,
      linkWebsite,
      address,
      bannerFile,
      imageFile,
    } = action.payload;

    const token = yield call(signWallet);
    

    const response = yield call(api.updateUserToDatabase, {
      address,
      formData: {
        username,
        bio,
        email,
        linkWebsite,
      },
      image: imageFile,
      banner: bannerFile,
      token
    });

    if (response) {
      toast("Your profile has been updated successfully!");
      action.onSuccess();
    }
  } catch {
    toast("There was an error processing this request!");
    action.onError();
  }
}

export function* signWallet() {
  const connectedWallet = yield select(selectCurrentWallet);

  console.log("connectedWallet ======", connectedWallet)
  const { token } = yield call(signIn, connectedWallet);
  console.log("######", token);
  yield put(setToken(token));
  return token;
}

// Starts fetchUser on each dispatched USER_FETCH_REQUESTED action
// Allows concurrent fetches of user

function* updateProfileForUser() {
  yield takeLatest(UPDATE_PROFILE, updateUserProfile);
}

function* loadUser() {
  yield takeLatest(LOAD_USER, getConnectedUser);
}

export { loadUser, updateProfileForUser };
