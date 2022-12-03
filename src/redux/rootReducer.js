import { combineReducers } from "redux";
import CollectionReducer from "./collectionReducer";
import UserReducer from "./userReducer";

const reducers = combineReducers({
  user: UserReducer.reducer,
  collection: CollectionReducer.reducer,
});

const rootReducer = (state, action) => {
  if (action.type === "DESTROY_SESSION") {
    console.log("DESTROYIN_SESSION");
    state = undefined;
  }

  return reducers(state, action);
};

export default rootReducer;
