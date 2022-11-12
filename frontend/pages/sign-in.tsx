import Link from "next/link";
import FirebaseAuth from "../components/FirebaseAuth/FirebaseAuth";

import { getApps, initializeApp, getApp } from "@firebase/app";
import {
  GoogleAuthProvider,
  FacebookAuthProvider,
  EmailAuthProvider,
  getAuth,
  connectAuthEmulator,
} from "firebase/auth";
import { auth as firebaseuiAuth } from "firebaseui";

// Configure FirebaseUI.
const uiConfig = {
  // Popup signin flow rather than redirect flow.
  signInFlow: "redirect",
  // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
  signInSuccessUrl: "/sign-in",
  // We will display Google and Facebook as auth providers.
  signInOptions: [
    GoogleAuthProvider.PROVIDER_ID,
    EmailAuthProvider.PROVIDER_ID,
  ],
  autoUpgradeAnonymousUsers: true,
  callbacks: {
    signInFailure: (error: firebaseuiAuth.AuthUIError) => {
      console.error(error);
    },
  },
};

const firebaseConfig = {
  apiKey: "test",
  authDomain: "localhost",
};

const firebaseApp = !getApps().length
  ? initializeApp(firebaseConfig)
  : getApp();
const auth = getAuth(firebaseApp);

if (process.env.NODE_ENV !== "production") {
  connectAuthEmulator(auth, "http://localhost:9099");
}

const SignIn = () => {
  return (
    <div className="mt-20 max-w-6xl mx-auto px-4 sm:px-6">
      <p>Sign-in</p>
      <Link href="/">See the homepage.</Link>
      <FirebaseAuth uiConfig={uiConfig} firebaseAuth={auth} />
      <button
        onClick={() => {
          console.error(auth.currentUser);
        }}
      >
        TEST
      </button>
    </div>
  );
};

export default SignIn;
