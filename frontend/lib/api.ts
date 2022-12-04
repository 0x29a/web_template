import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { HYDRATE } from "next-redux-wrapper";

import { firebaseAuth } from "./firebaseAuth";
import { getCookie } from "./utils";

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BACKEND_URL,
    prepareHeaders: async (headers) => {
      const csrftoken = getCookie("csrftoken");
      if (csrftoken) {
        headers.set("X-CSRFToken", csrftoken);
      }
      const firebaseUser = firebaseAuth.currentUser;
      if (firebaseUser) {
        const token = await firebaseUser.getIdToken();
        headers.set("Authorization", token);
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
