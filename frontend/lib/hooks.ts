import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { backendApi, useAuthLogoutCreateMutation } from "./backendApi";
import { signIn, signOut } from "./slices/authSlice";
import { AppDispatch } from "./store";

export function useAuthentication() {
  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    dispatch(backendApi.endpoints.authUserRetrieve.initiate()).then((result) => {
      if (result.isSuccess) {
        dispatch(signIn());
      } else if (result.isError) {
        dispatch(signOut());
      }
    });
  }, [dispatch]);
}

export function useSignOut() {
  const dispatch: AppDispatch = useDispatch();
  const [trigger, mutationResult] = useAuthLogoutCreateMutation();

  return {
    signOut: () => {
      trigger().then(() => dispatch(signOut()));
    },
    isLoading: mutationResult.isLoading,
  };
}
