import { createSlice, createSelector } from "@reduxjs/toolkit";

const INITIAL_STATE = {
  mostPopularCollections: [],
  isLoadingMspl: false,

  searcheableCollections: [],
  isLoadingSearcheable: false,


  // general loading
  collectionDetails: undefined,
  currentCollectionNfts : undefined,
  isLoading: false,
  isLoadingNfts: false
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
    setCurrentCollectionNfts: (state, action) => {
      state.currentCollectionNfts = action.payload;
    },
    setIsLoading : (state, action) => {
      state.isLoading = action.payload;
    },
    setIsLoadingNfts : (state, action) => {
      state.isLoadingNfts = action.payload;
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

export const selectCurrentCollectionNfts = createSelector(
  [selectSelf],
  (collection) => collection.currentCollectionNfts
);

export const selectCollectionDetails = createSelector(
  [selectSelf],
  (collection) => collection.collectionDetails
);

export const selectIsLoading = createSelector(
  [selectSelf],
  (collection) => collection.isLoading
);
export const selectIsLoadingNfts = createSelector(
  [selectSelf],
  (collection) => collection.isLoadingNfts
);


export const {
  setMostPopularCollections,
  setIsLoadingMspl,
  setSearcheableCollections,
  setIsLoadingSearcheableCollection,
  setIsLoading,
  setCollectionDetails,
  setCurrentCollectionNfts,
  setIsLoadingNfts
} = CollectionReducer.actions;

export default CollectionReducer;
