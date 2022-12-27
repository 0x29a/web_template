import { createSelector } from "@reduxjs/toolkit";

import { RootState } from "./store";

const selectAuth = (state: RootState) => state.auth;

export const isAuthenticatedSelector = createSelector(
  selectAuth,
  (auth) => auth.isAuthenticatedDjango || auth.isAuthenticatedFirebase
);

export const isAuthInitializedSelector = createSelector(
  selectAuth,
  (auth) => auth.isDjangoInitialized && auth.isFirebaInitialized
);
