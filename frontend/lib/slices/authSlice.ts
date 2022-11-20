import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export const localStorageTokenKey = "token";

type AuthState = {
  token: string;
  isLoggedIn: boolean;
  mode: "native" | "firebase";
};

const initialState: AuthState = {
  token: "",
  isLoggedIn: false,
  mode: "native",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    refreshTokenFromTheLocalStorage: (state) => {
      const token = localStorage.getItem(localStorageTokenKey);
      if (token) {
        state.token = token;
        state.isLoggedIn = true;
      }
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
      state.isLoggedIn = true;
      localStorage.setItem(localStorageTokenKey, action.payload);
    },
    unsetToken: (state) => {
      state.token = "";
      state.isLoggedIn = false;
      localStorage.removeItem(localStorageTokenKey);
    },
    firebaseLogin: (state) => {
      state.isLoggedIn = true;
      state.mode = "firebase";
    },
    firebaseLogout: (state) => {
      state.isLoggedIn = false;
      state.mode = "native";
    },
  },
});

export const { refreshTokenFromTheLocalStorage, setToken, unsetToken, firebaseLogin, firebaseLogout } =
  authSlice.actions;

export default authSlice.reducer;
