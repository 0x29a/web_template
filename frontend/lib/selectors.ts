import { createSelector } from "@reduxjs/toolkit";

import { RootState } from "./store";

const selectAuth = (state: RootState) => state.auth;

export const isLoggedIn = createSelector(selectAuth, (auth) => auth.isLoggedIn);
