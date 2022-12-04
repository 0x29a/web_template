import { createSlice } from "@reduxjs/toolkit";

export const localStorageTokenKey = "token";

type AuthState = {
  isAuthenticatedDjango: boolean;
  isAuthenticatedFirebase: boolean;
  isDjangoLoading: boolean;
  isFirebaseLoading: boolean;
};

const initialState: AuthState = {
  isAuthenticatedDjango: false,
  isAuthenticatedFirebase: false,
  isDjangoLoading: true,
  isFirebaseLoading: true,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    djangoLogin: (state) => {
      state.isAuthenticatedDjango = true;
      state.isDjangoLoading = false;
    },
    djangoLogout: (state) => {
      state.isAuthenticatedDjango = false;
      state.isDjangoLoading = false;
    },
    firebaseLogin: (state) => {
      state.isAuthenticatedFirebase = true;
      state.isFirebaseLoading = false;
    },
    firebaseLogout: (state) => {
      state.isAuthenticatedFirebase = false;
      state.isFirebaseLoading = false;
    },
  },
});

export const { djangoLogin, djangoLogout, firebaseLogin, firebaseLogout } = authSlice.actions;

export default authSlice.reducer;
