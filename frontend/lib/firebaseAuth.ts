import { getApp, getApps, initializeApp } from "firebase/app";
import { GoogleAuthProvider, connectAuthEmulator, getAuth, signInWithRedirect } from "firebase/auth";

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
