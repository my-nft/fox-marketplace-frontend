import { createSlice, createSelector } from "@reduxjs/toolkit";

const INITIAL_STATE = {
  currentUser: undefined,
  token: undefined,
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
    setToken : (state, action) => {
      state.token = action.payload;
    }
  },
});

const selectSelf = (state) => state.user;

export const UserActions = UserReducer.actions;

export const selectConnectedUser = createSelector(
  [selectSelf],
  (user) => user.currentUser
);

export const selectIsLoading = createSelector(
  [selectSelf],
  (user) => user.loading
);

export const selectToken = createSelector(
  [selectSelf],
  (user) => user.token
)

export const { setCurrentUser, setLoading, setToken } = UserReducer.actions;

export default UserReducer;
