import { createSlice } from "@reduxjs/toolkit";
import { Token } from "../../packages/client";

const slice = createSlice({
    name: "login",
    initialState: {
        token: ""
    },
    reducers: {
        loginSuccess: (state, { payload } : { payload: Token }) => {
            state.token = payload.key;
        }
    },
});

export const {
    loginSuccess
} = slice.actions;

export const {
    reducer,
} = slice;
