import { createSlice } from "@reduxjs/toolkit";

type AuthState = {
  isAuthenticated: boolean;
  isInitialized: boolean;
};

const initialState: AuthState = {
  isAuthenticated: false,
  isInitialized: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signIn: (state) => {
      state.isAuthenticated = true;
      state.isInitialized = true;
    },
    signOut: (state) => {
      state.isAuthenticated = false;
      state.isInitialized = true;
    },
  },
});

export const { signIn, signOut } = authSlice.actions;

export default authSlice.reducer;
