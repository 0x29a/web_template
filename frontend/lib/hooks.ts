import { getRedirectResult, onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { firebaseAuth } from "./firebaseAuth";
import { firebaseLogin, firebaseLogout } from "./slices/authSlice";

// Tracks if a firebase user is logged in. It's useful when the redirect flow is
// enabled, as the login action is dispatched almost instantly after the page loads.
export const useTrackFirebaseUser = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, (user) => {
      if (user) {
        dispatch(firebaseLogin());
      } else {
        console.log('logout!!!')
        dispatch(firebaseLogout());
      }
    });
    return unsubscribe;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};


export const useHandleFirebaseRedirect = () => {
  const dispatch = useDispatch();

  getRedirectResult(firebaseAuth).then(
    result => {
      if (result) {
        dispatch(firebaseLogin());
      }
    }
  )
}