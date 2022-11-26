import { getApp, getApps, initializeApp } from "firebase/app";
import { GoogleAuthProvider, connectAuthEmulator, getAuth, signInWithRedirect, signOut } from "firebase/auth";
import { useState } from "react";

// Initializing firebase app
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_AUTH_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
};
const firebaseApp = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Initializing firebase auth app
export const firebaseAuth = getAuth(firebaseApp);

// Connecting firebase client to firebase-tools container
if (process.env.NODE_ENV !== "production") {
  connectAuthEmulator(firebaseAuth, process.env.NEXT_PUBLIC_FIREBASE_AUTH_EMULATOR_URL || "");
}

export function signInWithGoogleRedirect() {
  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({
    redirectUri: "/about",
  });
  signInWithRedirect(firebaseAuth, provider);
}

export function useLogout() {
  const [error, setError] = useState<string>("");
  const [isPending, setIsPending] = useState(false);

  const logout = () => {
    setError("");
    setIsPending(true);
    signOut(firebaseAuth)
      .then(() => {
        setError("");
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  return { isPending, error, logout };
}
