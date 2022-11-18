import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import { backendApi } from "./backendApi";

import authReducer from "./slices/authSlice";

const makeStore = () => {
  const store = configureStore({
    reducer: {
      auth: authReducer,
      [backendApi.reducerPath]: backendApi.reducer,
    },
    devTools: process.env.NODE_ENV !== "production",
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(backendApi.middleware),
  });
  return store;
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;

export type AppDispatch = AppStore["dispatch"];

export const wrapper = createWrapper<AppStore>(makeStore, {
  debug: process.env.NODE_ENV !== "production",
});
