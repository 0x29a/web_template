import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { HYDRATE } from "next-redux-wrapper";
import { RootState } from "./store";

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "http://backend:5000",
    prepareHeaders: (headers, { getState }) => {
      const state = getState() as RootState;
      if (state.firebaseUserReducer.loginStatus) {
        headers.set("Authorization", `Bearer ${state.firebaseUserReducer.accessToken})`);
      }
      return headers;
    },
  }),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },
  endpoints: () => ({}),
});
