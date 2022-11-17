import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { HYDRATE } from "next-redux-wrapper";
import { RootState } from "./store";

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BACKEND_URL,
    prepareHeaders: (headers, { getState }) => {
      const state = getState() as RootState;
      console.log(state);
      // TODO: fetch an authorization token here and configure headers
      // headers.set("Authorization", `Bearer ${state.reducer.token})`);
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
