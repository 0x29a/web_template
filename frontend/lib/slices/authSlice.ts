import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export const localStorageTokenKey = "token";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: "",
  },
  reducers: {
    setTokenFromTheLocalstorage: (state) => {
      const token = localStorage.getItem(localStorageTokenKey);
      if (token) {
        state.token = token;
      }
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
      localStorage.setItem(localStorageTokenKey, action.payload);
    },
    unsetToken: (state) => {
      state.token = "";
      localStorage.removeItem(localStorageTokenKey);
    },
  },
});

export const { setTokenFromTheLocalstorage, setToken, unsetToken } = authSlice.actions;
export default authSlice.reducer;
