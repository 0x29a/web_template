import { getSession, signOut as nextSignOut } from "next-auth/react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { backendApi, useAuthLogoutCreateMutation } from "./backendApi";
import { signIn as stateSignIn, signOut as stateSignOut } from "./slices/authSlice";
import { AppDispatch } from "./store";

async function retreiveUser(dispatch: AppDispatch) {
  const result = await dispatch(backendApi.endpoints.authUserRetrieve.initiate());
  if (result.isSuccess) {
    return dispatch(stateSignIn());
  } else if (result.isError) {
    return dispatch(stateSignOut());
  }
}

async function authenticateUser(dispatch: AppDispatch) {
  const session = await getSession();
  if (session) {
    return dispatch(
      backendApi.endpoints.authSocialGoogleCreate.initiate({ socialLogin: { access_token: session.id_token } })
    );
  } else {
    return null;
  }
}

export function useAuthentication() {
  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    authenticateUser(dispatch).then(() => retreiveUser(dispatch));
  }, [dispatch]);
}

export function useSignOut() {
  const dispatch: AppDispatch = useDispatch();
  const [trigger, mutationResult] = useAuthLogoutCreateMutation();

  return {
    signOut: () => {
      trigger()
        .then(() => nextSignOut({ redirect: false }))
        .then(() => dispatch(stateSignOut()));
    },
    isLoading: mutationResult.isLoading,
  };
}
