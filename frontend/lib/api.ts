// Or from '@reduxjs/toolkit/query' if not using the auto-generated hooks
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { HYDRATE } from "next-redux-wrapper";

// initialize an empty api service that we'll inject endpoints into later as needed
export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "http://caddy:8123/" }),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      console.log('***************************************');
      console.log(reducerPath);
      let d = action.payload[reducerPath];
      d['queries'] = {'lol': 'test'}
      return d;
    }
  },
  endpoints: () => ({}),
});
