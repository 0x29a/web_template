import { onAuthStateChanged, signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { backendApi, useAuthLogoutCreateMutation } from "./backendApi";
import { firebaseAuth } from "./firebaseAuth";
import { djangoLogin, djangoLogout, firebaseLogin, firebaseLogout } from "./slices/authSlice";
import { AppDispatch } from "./store";

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
  const { isPending, logout } = useFirebaseLogout();

  return {
    logout: () => {
      logout();
      trigger().then(() => dispatch(djangoLogout()));
    },
    isLoading: mutationResult.isLoading || isPending,
  };
}
