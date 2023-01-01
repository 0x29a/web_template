import { onAuthStateChanged, signOut as firebaseSignOut } from "firebase/auth";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { backendApi, useAuthLogoutCreateMutation } from "./backendApi";
import { firebaseAuth } from "./firebaseAuth";
import { signIn as signInAction, signOut as signOutAction } from "./slices/authSlice";
import { AppDispatch } from "./store";

export function useDjangoAuthentication() {
  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    dispatch(backendApi.endpoints.authUserRetrieve.initiate()).then((result) => {
      if (result.isSuccess) {
        dispatch(signInAction("django"));
      } else if (result.isError) {
        dispatch(signOutAction("django"));
      }
    });
  }, [dispatch]);
}

// Tracks if a firebase user is logged in. It's useful when the redirect flow is
// enabled, as the signIn action is dispatched almost instantly after the page loads.
export function useFirebaseAuthentication() {
  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (user) => {
      if (user) {
        dispatch(signInAction("firebase"));
      } else {
        dispatch(signOutAction("firebase"));
      }
    });
  }, [dispatch]);
}

export function useAuthentication() {
  useDjangoAuthentication();
  useFirebaseAuthentication();
}

export function useFirebaseSignOut() {
  const [error, setError] = useState<string>("");
  const [isPending, setIsPending] = useState(false);

  const signOut = () => {
    setError("");
    setIsPending(true);
    firebaseSignOut(firebaseAuth)
      .then(() => {
        setError("");
        setIsPending(false);
      })
      .catch((err) => {
        setError(err.message);
        setIsPending(false);
      });
  };

  return { isPending, error, signOut };
}

export function useSignOut() {
  const dispatch: AppDispatch = useDispatch();
  const [trigger, mutationResult] = useAuthLogoutCreateMutation();

  const firebaseSignOut = useFirebaseSignOut();

  return {
    signOut: () => {
      firebaseSignOut.signOut();
      trigger().then(() => dispatch(signOutAction("django")));
    },
    isLoading: mutationResult.isLoading || firebaseSignOut.isPending,
  };
}
