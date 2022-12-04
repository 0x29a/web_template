import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { backendApi } from "./backendApi";
import { firebaseAuth } from "./firebaseAuth";
import { djangoLogin, djangoLogout, firebaseLogin, firebaseLogout } from "./slices/authSlice";
import { AppDispatch } from "./store";

// Tracks if a firebase user is logged in. It's useful when the redirect flow is
// enabled, as the login action is dispatched almost instantly after the page loads.
export function useFirebaseAuthentication() {
  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (user) => {
      if (user) {
        dispatch(firebaseLogin());
      } else {
        dispatch(firebaseLogout());
      }
    });
  }, [dispatch]);
}

export function useDjangoAuthentication() {
  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    dispatch(backendApi.endpoints.authUserRetrieve.initiate()).then((result) => {
      if (result.isSuccess) {
        dispatch(djangoLogin());
      } else if (result.isError) {
        dispatch(djangoLogout());
      }
    });
  }, [dispatch]);
}
