import Link from "next/link";

import GoogleForm from "../components/GoogleForm/GoogleForm";
import SignInForm from "../components/SignInForm/SignInForm";

export default function SignIn() {
  return (
    <section className="bg-gradient-to-b from-gray-100 to-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="pt-32 pb-12 md:pt-40 md:pb-20">
          {/* Page header */}
          <div className="max-3-xl mx-auto text-center pb-12 md:pb-20">
            <h1 className="h1">Welcome back. Some pathetic quote.</h1>
          </div>

          {/* Forms */}
          <div className="max-w-sm mx-auto">
            <SignInForm />
            <div className="flex items-center my-6">
              <div className="border-t border-gray-300 grow mr-3" aria-hidden="true"></div>
              <div className="text-gray-600 italic">Or</div>
              <div className="border-t border-gray-300 grow ml-3" aria-hidden="true"></div>
            </div>
            <GoogleForm />
            <div className="text-gray-600 text-center mt-6">
              Don’t you have an account?{" "}
              <Link href="/register" className="text-blue-600 hover:underline transition duration-150 ease-in-out">
                Register
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
