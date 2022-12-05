
import { createSlice, createSelector } from "@reduxjs/toolkit";

const INITIAL_STATE = {
    collections: [],
    nfts: [],
    created: [],
    collected: [],
    isLoading: false,
    accountOwner: false
}

const AccountReducer = createSlice({
    name: "account",
    initialState: INITIAL_STATE,
    reducers: {
        setAccountCollections: (state, action) => {
            state.collections = action.payload;
        },
        setAccountNfts: (state, action) => {
            state.nfts = action.payload;
        },
        setAccountCreated: (state, action) => {
            state.created = action.payload;
        },
        setAccountCollected: (state, action) => {
            state.collected = action.payload;
        },
        setIsLoadingAccount: (state, action) =>  {
            state.isLoading = action.payload;
        },
        setAccountOwner: (state, action) => {
            state.accountOwner = action.payload;
        }

    }
})

const selectSelf = (state) => state.account;

export const AccountActions = AccountReducer.actions;

export const selectCollections = createSelector(
    [selectSelf],
    (account) => account.collections
)

export const selectNfts = createSelector(
    [selectSelf],
    (account) => account.nfts
)

export const selectCreated = createSelector(
    [selectSelf],
    (account) => account.created
)

export const selectCollected = createSelector(
    [selectSelf],
    (account) => account.collected
)

export const selectIsLoadingAccount = createSelector(
    [selectSelf],
    (account) => account.isLoading 
)

export const selectAccountOwner = createSelector(
    [selectSelf],
    (account) => account.accountOwner
)

export const { 
    setAccountCollections,
    setAccountNfts,
    setAccountOwned,
    setAccountCollected,
    setIsLoadingAccount,
    setAccountOwner
    
} = AccountActions;

export default AccountReducer;