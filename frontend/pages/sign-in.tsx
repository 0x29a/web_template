import Link from "next/link";

import { firebaseAuth } from "../lib/firebaseAuth";
import { useSignInWithGithub } from "react-firebase-hooks/auth";

const SignIn = () => {
  const [signInWithGithub, user, loading, error] =
    useSignInWithGithub(firebaseAuth);

  return (
    <div className="mt-20 max-w-6xl mx-auto px-4 sm:px-6">
      <p>Sign-in</p>
      <Link href="/">See the homepage.</Link>
      <button
        onClick={() => {
          signInWithGithub();
        }}
      >
        TEST
      </button>
    </div>
  );
};

export default SignIn;
