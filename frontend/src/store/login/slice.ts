import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'login',
  initialState: {
    token: null
  },
  reducers: {
    loginSuccess: (state, { payload }) => {
      state.token = payload.token;
    }
  },
});

export const {
  loginSuccess
} = slice.actions;

export const {
  reducer,
} = slice;
