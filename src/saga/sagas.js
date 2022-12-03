import { all } from 'redux-saga/effects';
import { loadPopularCollectionSaga, loadSearcheableCollectionSaga } from './collectionSaga';
import { loadUser } from './userSaga';



function *watchAll() {
    yield all([
      loadUser(),
      loadPopularCollectionSaga(),
      loadSearcheableCollectionSaga(),
    ]);
  }

  export default watchAll;