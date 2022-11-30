import { all } from 'redux-saga/effects';
import { loadUser } from './userSaga';



function *watchAll() {
    yield all([
      loadUser()
    ]);
  }

  export default watchAll;