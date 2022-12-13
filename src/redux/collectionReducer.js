import { createSlice, createSelector } from "@reduxjs/toolkit";

const INITIAL_STATE = {
  mostPopularCollections: [],
  isLoadingMspl: false,

  searcheableCollections: [],
  isLoadingSearcheable: false,


  // general loading
  collectionDetails: undefined,
  isLoading: false,
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
    setIsLoadingSearcheableCollection: (state, action) => {
      state.isLoadingSearcheable = action.payload;
    },
    setSearcheableCollections: (state, action) => {
      state.searcheableCollections = action.payload;
    },
    setCollectionDetails: (state, action) => {
      state.collectionDetails = action.payload;
    },
    setIsLoading : (state, action) => {
      state.isLoading = action.payload;
    }
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

export const selectSearcheableCollection = createSelector(
  [selectSelf],
  (collection) => collection.searcheableCollections
);

export const selectIsLoadingSearcheable = createSelector(
  [selectSelf],
  (collection) => collection.isLoadingSearcheable
);

export const selectCollectionDetails = createSelector(
  [selectSelf],
  (collection) => collection.collectionDetails
);

export const selectIsLoading = createSelector(
  [selectSelf],
  (collection) => collection.isLoading
);

export const {
  setMostPopularCollections,
  setIsLoadingMspl,
  setSearcheableCollections,
  setIsLoadingSearcheableCollection,
  setIsLoading,
  setCollectionDetails,
  setIsLoadingNfts
} = CollectionReducer.actions;

export default CollectionReducer;
