import { createSelector } from "@reduxjs/toolkit";
import { QueryStatus } from "@reduxjs/toolkit/dist/query";

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

export const isAnyRequestPendingSelector = createSelector(
  (state: RootState) => state.api.queries,
  (queries) => {
    return Object.values(queries).some((query) => {
      return query && query.status === QueryStatus.pending;
    });
  }
);
