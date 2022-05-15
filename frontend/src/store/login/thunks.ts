import { loginSuccess } from './slice';
import { LoginApi } from '../../packages/client';

import { AppThunk } from '../store';

export function login(): AppThunk {
  return async dispatch => {
    const api = new LoginApi();
    const result = await api.loginCreate({
      username: 'example',
      email: 'example',
      password: 'example'
    })

    dispatch(loginSuccess("lol"))
  }
}
