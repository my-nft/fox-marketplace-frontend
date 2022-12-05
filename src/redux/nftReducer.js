import { createSlice, createSelector } from "@reduxjs/toolkit";

const INITIAL_STATE = {
  // general loading
  nftDetails: undefined,
  isLoading: false
};

const NftReducer = createSlice({
  name: "nft",
  initialState: INITIAL_STATE,
  reducers: {
    setIsLoading : (state, action) => {
      state.isLoading = action.payload;
    },
    setNftDetails: (state, action) => {
      state.nftDetails = action.payload;
    },
  },
});

const selectSelf = (state) => state.nft;

export const NftActions = NftReducer.actions;


export const selectIsLoading = createSelector(
  [selectSelf],
  (nft) => nft.isLoading
);

export const selectNftDetails = createSelector(
  [selectSelf],
  (nft) => nft.nftDetails
);


export const {
  setIsLoading,
  setNftDetails
} = NftReducer.actions;

export default NftReducer;
