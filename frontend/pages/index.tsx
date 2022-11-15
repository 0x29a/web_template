import type { NextPageWithLayout } from "./_app";

import HeroHome from "../components/HeroHome/HeroHome";

const Home: NextPageWithLayout = () => {
  return (
    <div className="mt-20 max-w-6xl mx-auto px-4 sm:px-6">
      <HeroHome />
    </div>
  );
};

export default Home;
