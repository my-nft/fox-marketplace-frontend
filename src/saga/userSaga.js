import { call, put, takeLatest } from "redux-saga/effects";
import * as api from "../api/userApi";
import { setCurrentUser, setLoading, setToken } from "../redux/userReducer";
import { LOAD_USER } from "./actions";
import { signUp } from "../interactors/authInteractor";
import { toast } from "react-toastify";
// Worker saga will be fired on USER_FETCH_REQUESTED actions
function* getConnectedUser(action) {
  const address = action.payload;
  try {
    yield put(setLoading(true));
    const response = yield call(api.getUserByAddress, address);
    yield put(setCurrentUser(response.data));
  } catch (error) {
    console.log("error ", error.response.status);
    // userNotFound => Nothing to do here
    if (error.response.status === 404) {
      console.log("registration of a new user")
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


function* updateUserProfile(action){
  try{

    const {username, bio, email, linkWebsite, address, image, banner } = action.payload;



    const response = yield call(api.updateUserToDatabase, {
      address,
      formData:{
        username,
        bio,
        email,
        linkWebsite,
        image,
        banner
      }
    })

    if(response){
      toast("Your profile has been updated successfully!");
      action.onSuccess();
    }





  }
  catch{
    toast("There was an error processing this request!");
    action.onError()
  }
}



// Starts fetchUser on each dispatched USER_FETCH_REQUESTED action
// Allows concurrent fetches of user
function* loadUser() {
  yield takeLatest(LOAD_USER, getConnectedUser);
}

export { loadUser };
