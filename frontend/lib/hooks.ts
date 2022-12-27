import { onAuthStateChanged, signOut } from "firebase/auth";
import NProgress from "nprogress";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { backendApi, useAuthLogoutCreateMutation } from "./backendApi";
import { firebaseAuth } from "./firebaseAuth";
import { isAuthInitializedSelector } from "./selectors";
import { login, logout } from "./slices/authSlice";
import { AppDispatch } from "./store";

export function useDjangoAuthentication() {
  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    dispatch(backendApi.endpoints.authUserRetrieve.initiate()).then((result) => {
      if (result.isSuccess) {
        dispatch(login("django"));
      } else if (result.isError) {
        dispatch(logout("django"));
      }
    });
  }, [dispatch]);
}

// Tracks if a firebase user is logged in. It's useful when the redirect flow is
// enabled, as the login action is dispatched almost instantly after the page loads.
export function useFirebaseAuthentication() {
  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (user) => {
      if (user) {
        dispatch(login("firebase"));
      } else {
        dispatch(logout("firebase"));
      }
    });
  }, [dispatch]);
}

export function useAuthentication() {
  useDjangoAuthentication();
  useFirebaseAuthentication();
}

export function useFirebaseLogout() {
  const [error, setError] = useState<string>("");
  const [isPending, setIsPending] = useState(false);

  const logout = () => {
    setError("");
    setIsPending(true);
    signOut(firebaseAuth)
      .then(() => {
        setError("");
        setIsPending(false);
      })
      .catch((err) => {
        setError(err.message);
        setIsPending(false);
      });
  };

  return { isPending, error, logout };
}

export function useLogout() {
  const dispatch: AppDispatch = useDispatch();
  const [trigger, mutationResult] = useAuthLogoutCreateMutation();

  const firebaseLogout = useFirebaseLogout();

  return {
    logout: () => {
      firebaseLogout.logout();
      trigger().then(() => dispatch(logout("django")));
    },
    isLoading: mutationResult.isLoading || firebaseLogout.isPending,
  };
}

// hook that starts NProgress immediately and stops it when isAuthInitializedSelector is true
export function useNProgress() {
  const isAuthInitialized = useSelector(isAuthInitializedSelector);
  useEffect(() => {
    if (isAuthInitialized && NProgress.isStarted()) {
      NProgress.done();
    } else if (!isAuthInitialized && !NProgress.isStarted()) {
      NProgress.start();
    }
  }, [isAuthInitialized]);
}
