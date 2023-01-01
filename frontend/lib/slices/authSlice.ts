import { createSlice } from "@reduxjs/toolkit";

type AuthState = {
  isAuthenticatedDjango: boolean;
  isAuthenticatedFirebase: boolean;
  isDjangoInitialized: boolean;
  isFirebaInitialized: boolean;
};

const initialState: AuthState = {
  isAuthenticatedDjango: false,
  isAuthenticatedFirebase: false,
  isDjangoInitialized: false,
  isFirebaInitialized: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signIn: (state, { payload }) => {
      if (payload === "django") {
        state.isAuthenticatedDjango = true;
        state.isDjangoInitialized = true;
      } else if (payload === "firebase") {
        state.isAuthenticatedFirebase = true;
        state.isFirebaInitialized = true;
      }
    },
    signOut: (state, { payload }) => {
      if (payload === "django") {
        state.isAuthenticatedDjango = false;
        state.isDjangoInitialized = true;
      } else if (payload === "firebase") {
        state.isAuthenticatedFirebase = false;
        state.isFirebaInitialized = true;
      }
    },
  },
});

export const { signIn, signOut } = authSlice.actions;

export default authSlice.reducer;
