import React from 'react'
import { useAppDispatch } from './store/hooks';
import Layout from './containers/Layout/Layout'

import { login } from './store/login/thunks';

function App() {
  const dispatch = useAppDispatch();
  dispatch(login())
  return <Layout />
}

export default App;
