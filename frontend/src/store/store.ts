import { configureStore } from '@reduxjs/toolkit';
import { AnyAction } from 'redux'
import { ThunkAction } from 'redux-thunk'

import { reducer as loginReducer } from './login/slice';

export const store = configureStore({
  reducer: {
    login: loginReducer,
  }
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  AnyAction
>
