import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { createSlice } from "@reduxjs/toolkit";
import { getApps, initializeApp, getApp } from "firebase/app";
import { getAuth, connectAuthEmulator, onAuthStateChanged } from "firebase/auth";

// Initializing firebase app
const firebaseConfig = {
  apiKey: "test",
  authDomain: "localhost",
};
const firebaseApp = !getApps().length
  ? initializeApp(firebaseConfig)
  : getApp();

// Initializing firebase auth app
export const firebaseAuth = getAuth(firebaseApp);

// Connecting firebase client to firebase-tools container
if (process.env.NODE_ENV !== "production") {
  connectAuthEmulator(firebaseAuth, "http://localhost:9099");
}

// State slice that is used specifically to track the firebase user
// access token.
const firebaseUserSlice = createSlice({
  name: "firebaseUser",
  initialState: {
    accessToken: "",
    loginStatus: false
  },
  reducers: {
    setActiveUserInfo: (state, action) => {
      state.loginStatus = action.payload.loggedIn
      if (action.payload.accessToken) {
        state.accessToken = action.payload.accessToken
      }
    }
  }
});

export const firebaseUserReducer = firebaseUserSlice.reducer;

// Use this hook in the top component of your app.
export const useTrackFirebaseUser = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, (user) => {
      if (user) {
        dispatch(firebaseUserSlice.actions.setActiveUserInfo({
          loginStatus: true,
          // @ts-ignore by some reason User type doesn't have
          // `accessToken` defined, but it's clearly exists.
          accessToken: user.accessToken
        }))
      } else {
        dispatch(firebaseUserSlice.actions.setActiveUserInfo({
          loginStatus: false,
          accessToken: ""
        }))
      }
    });
    return unsubscribe;
  }, []);
}
