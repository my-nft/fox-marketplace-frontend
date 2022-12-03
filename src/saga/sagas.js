import { all } from 'redux-saga/effects';
import { loadCollectionSaga } from './collectionSaga';
import { loadUser } from './userSaga';



function *watchAll() {
    yield all([
      loadUser(),
      loadCollectionSaga()
    ]);
  }

  export default watchAll;