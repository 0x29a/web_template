import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import { backendApi } from "./backendApi";

const makeStore = () => {
  const store = configureStore({
    reducer: {
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
