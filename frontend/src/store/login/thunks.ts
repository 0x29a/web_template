import { loginSuccess } from './slice';
import { loginApi } from '../api';
import { AppThunk } from '../store';

export function login(): AppThunk {
  return async dispatch => {
    const result = loginApi.loginCreate({
      username: 'example',
      email: 'test@example.com',
      password: 'example',
    })

    dispatch(loginSuccess("lol"))
  }
}
