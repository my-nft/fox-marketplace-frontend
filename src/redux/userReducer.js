import { createSlice, createSelector } from "@reduxjs/toolkit";

const INITIAL_STATE = {
  currentWallet: undefined,
  currentUser: undefined,
  loading: false,
};

const UserReducer = createSlice({
  name: "user",
  initialState: INITIAL_STATE,
  reducers: {
    setCurrentWallet: (state, action) => {
      state.currentWallet = action.payload;
    },
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

const selectSelf = (state) => state.user;

export const UserActions = UserReducer.actions;

export const selectConnectedWallet = createSelector(
  [selectSelf],
  (user) => user.currentWallet
);

export const selectConnectedUser = createSelector(
  [selectSelf],
  (user) => user.currentUser
);

export const selectIsLoading = createSelector(
  [selectSelf],
  (user) => user.loading
);

export const { setCurrentWallet, setCurrentUser, setLoading } = UserReducer.actions;

export default UserReducer;
