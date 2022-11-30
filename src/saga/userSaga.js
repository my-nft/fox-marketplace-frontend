import { call, put, takeLatest } from "redux-saga/effects";
import * as api from "../api/userApi";
import { setCurrentUser, setLoading } from "../redux/userReducer";
import { LOAD_USER } from "./actions";

// Worker saga will be fired on USER_FETCH_REQUESTED actions
function* getConnectedUser(action) {
  try {
    yield put(setLoading(true));

    const connectedUser = yield call(api.getUserByAddress);

    yield put(setCurrentUser(connectedUser));

    yield put(setLoading(false));
  } catch (error) {
    console.log(error);
  }
}

// Starts fetchUser on each dispatched USER_FETCH_REQUESTED action
// Allows concurrent fetches of user
function* loadUser() {
  yield takeLatest(LOAD_USER, getConnectedUser);
}

export { loadUser };
