import { createSlice, createSelector } from "@reduxjs/toolkit";

const INITIAL_STATE = {
  mostPopularCollections: [],
  isLoadingMspl: false,
};

const CollectionReducer = createSlice({
  name: "collection",
  initialState: INITIAL_STATE,
  reducers: {
    setMostPopularCollections: (state, action) => {
      state.mostPopularCollections = action.payload;
    },
    setIsLoadingMspl: (state, action) => {
      state.isLoadingMspl = action.payload;
    },
  },
});

const selectSelf = (state) => state.collection;

export const CollectionActions = CollectionReducer.actions;

export const selectMostPopularCollections = createSelector(
  [selectSelf],
  (collection) => collection.mostPopularCollections
);

export const selectIsLoadingMspl = createSelector(
  [selectSelf],
  (collection) => collection.loading
);

export const { setMostPopularCollections, setIsLoadingMspl } =
  CollectionReducer.actions;

export default CollectionReducer;
