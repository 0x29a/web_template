import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSelector } from "react-redux";

import { ProgressBar } from "../components/ProgressBar/ProgressBar";
import { isAuthInitializedSelector, isAuthenticatedSelector } from "../lib/selectors";

export default function AuthSuccess() {
  const router = useRouter();

  const isAuthenticated = useSelector(isAuthenticatedSelector);
  const isInitialized = useSelector(isAuthInitializedSelector);

  useEffect(() => {
    if (isInitialized && isAuthenticated) {
      router.push("/about?progress=disabled");
    }
    if (isInitialized && !isAuthenticated) {
      router.push("/sign-in?progress=disabled");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInitialized, isAuthenticated]);

  return (
    <>
      <Head>
        <title>Web Template</title>
      </Head>
      <ProgressBar />
      <section className="bg-gradient-to-b from-gray-100 to-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="pt-32 pb-12 md:pt-40 md:pb-20">
            {/* Page header */}
            <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
              <h1 className="h1">You&apos;ve been successfully authenticated</h1>
              <p className="text-xl text-gray-600 mt-8">Loading...</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

AuthSuccess.getLayout = (page: typeof AuthSuccess) => page;
