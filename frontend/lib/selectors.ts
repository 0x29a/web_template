import { createSelector } from "@reduxjs/toolkit";
import { QueryStatus } from "@reduxjs/toolkit/dist/query";

import { RootState } from "./store";

const selectAuth = (state: RootState) => state.auth;

export const isAuthenticatedSelector = createSelector(selectAuth, (auth) => auth.isAuthenticated);

export const isAuthInitializedSelector = createSelector(selectAuth, (auth) => auth.isInitialized);

const selectRTKQueries = (state: RootState) => state.api.queries;

export const isAnyRequestPendingSelector = createSelector(selectRTKQueries, (queries) => {
  return Object.values(queries).some((query) => {
    return query && query.status === QueryStatus.pending;
  });
});
