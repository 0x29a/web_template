import Link from "next/link";

const SignIn = () => {
  return (
    <div className="mt-20 max-w-6xl mx-auto px-4 sm:px-6">
      <p>Sign-in</p>
      <Link href="/">See the homepage.</Link>
      <div>
        <button className="btn">Try Sign In</button>
        <button className="btn">Execute the lazy query</button>
      </div>
    </div>
  );
};

export default SignIn;
