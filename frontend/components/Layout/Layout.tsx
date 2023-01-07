import Head from "next/head";
import { useRouter } from "next/router";
import type { ReactElement } from "react";

import { PROTECTED_PAGES } from "../../lib/constants";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import { ProgressBar } from "../ProgressBar/ProgressBar";
import ProtectedContent from "../ProtectedContent/ProtectedContent";

export default function Layout({ children }: { children: ReactElement }) {
  const { pathname } = useRouter();

  const innerContent =
    pathname in PROTECTED_PAGES ? (
      <ProtectedContent {...PROTECTED_PAGES[pathname]}>{children}</ProtectedContent>
    ) : (
      children
    );

  return (
    <>
      <Head>
        <title>Web Template</title>
      </Head>
      <ProgressBar />
      <div className="antialiased bg-white text-gray-900 tracking-light">
        <div className="flex flex-col min-h-screen overflow-hidden">
          <Header />
          <main className="grow">{innerContent}</main>
          <Footer />
        </div>
      </div>
    </>
  );
}
