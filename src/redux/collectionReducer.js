import { createSlice, createSelector } from "@reduxjs/toolkit";

const INITIAL_STATE = {
  mostPopularCollections: [],
  isLoadingMspl: false,

  searcheableCollections: [],
  isLoadingSearcheable: false,

  marketPlaceNfts: [],
  isLoadingMarketPlaceNfts: false,
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
    setMarketPlaceNfts: (state, action) => {
      state.marketPlaceNfts = action.payload;
    },
    setIsLoadingMarketPlaceNfts : (state, action) => {
      state.isLoadingMarketPlaceNfts = action.payload;
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

export const selectMarketPlaceNfts = createSelector(
  [selectSelf],
  (collection) => collection.marketPlaceNfts
);

export const selectIsLoadingMarketPlaceNfts = createSelector(
  [selectSelf],
  (collection) => collection.isLoadingMarketPlaceNfts
);

export const {
  setMostPopularCollections,
  setIsLoadingMspl,
  setSearcheableCollections,
  setIsLoadingSearcheableCollection,
  setMarketPlaceNfts,
  setIsLoadingMarketPlaceNfts
} = CollectionReducer.actions;

export default CollectionReducer;
