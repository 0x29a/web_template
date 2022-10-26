import "nprogress/nprogress.css";
import "../styles/globals.css";

import Router from "next/router";
import NProgress from "nprogress";

import { wrapper } from "../lib/store";
import type { ReactElement, ReactNode } from "react";
import type { NextPage } from "next";
import type { AppProps } from "next/app";

import Layout from "../components/Layout/Layout";

export type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

// Loading bar.
NProgress.configure({ showSpinner: false })
Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

function defaultGetLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
}

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? defaultGetLayout;
  return getLayout(<Component {...pageProps} />);
}

const wrappedApp = wrapper.withRedux(MyApp);

export default wrappedApp;
