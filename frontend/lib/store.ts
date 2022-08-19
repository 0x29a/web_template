import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import { backendApi } from "./backendApi";

const makeStore = () => {
  const store = configureStore({
    // Add the generated reducer as a specific top-level slice
    reducer: {
      [backendApi.reducerPath]: backendApi.reducer,
    },
    devTools: process.env.NODE_ENV !== "production",
    // Adding the api middleware enables caching, invalidation, polling,
    // and other useful features of `rtk-query`.
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(backendApi.middleware),
  });
  return store;
};

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
// setupListeners(store.dispatch)

// Infer the `RootState` and `AppDispatch` types from the store itself
export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = AppStore["dispatch"];

export const wrapper = createWrapper<AppStore>(makeStore, {'debug': process.env.NODE_ENV !== "production"});
