import { configureStore } from '@reduxjs/toolkit';

import { reducer as loginReducer } from './login/slice';

export function initializeStore() {
  return configureStore({
    reducer: {
      login: loginReducer,
    }
  });
}
