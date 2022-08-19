import type { NextPageWithLayout } from "./_app";

import Link from "next/link";

const Home: NextPageWithLayout = () => {
  return (
    <div>
      <p>Hello, World!</p>
      <Link href="/about">
        <a>See the about page.</a>
      </Link>
    </div>
  );
};

export default Home;
