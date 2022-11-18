import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { HYDRATE } from "next-redux-wrapper";
import { RootState } from "./store";
import { getCookie } from "./utils";

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BACKEND_URL,
    prepareHeaders: (headers, { getState }) => {
      const state = getState() as RootState;
      // TODO: fetch an authorization token here and configure headers
      // headers.set("Authorization", `Bearer ${state.reducer.token})`);
      const csrftoken = getCookie("csrftoken");
      if (csrftoken) {
        headers.set("X-CSRFToken", csrftoken);
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
