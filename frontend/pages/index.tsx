import type { NextPageWithLayout } from "./_app";

import Link from "next/link";

const Home: NextPageWithLayout = () => {
  return (
    <div className="mt-20 max-w-6xl mx-auto px-4 sm:px-6">
      <p className="">Hello, World!</p>
      <Link href="/about">See the about page.</Link>
    </div>
  );
};

export default Home;
