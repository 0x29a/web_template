import type { NextPage } from "next";
import type { AppProps } from "next/app";
import Router from "next/router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import type { ReactElement, ReactNode } from "react";

import Layout from "../components/Layout/Layout";
import { useAuthentication } from "../lib/hooks";
import { wrapper } from "../lib/store";
import "../styles/globals.css";

export type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

// Loading bar.
NProgress.configure({ showSpinner: false });

// start progress bar on route change if uri doesn't end with "?progress=disabled"
Router.events.on("routeChangeStart", (url) => {
  if (!url.endsWith("?progress=disabled")) {
    NProgress.start();
  }
});

// stop progress bar on route change complete if uri doesn't end with "?progress=disabled"
Router.events.on("routeChangeComplete", (url) => {
  if (!url.endsWith("?progress=disabled")) {
    NProgress.done();
  }
});

// stop progress bar on route change error if uri doesn't end with "?progress=disabled"
Router.events.on("routeChangeError", (url) => {
  if (!url.endsWith("?progress=disabled")) {
    NProgress.done();
  }
});

function defaultGetLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
}

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  useAuthentication();

  const getLayout = Component.getLayout ?? defaultGetLayout;
  return getLayout(<Component {...pageProps} />);
}

const wrappedApp = wrapper.withRedux(MyApp);

export default wrappedApp;
