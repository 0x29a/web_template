import "../styles/globals.css";
import type { AppProps } from "next/app";
import { wrapper } from "../lib/store";

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

const wrappedApp = wrapper.withRedux(MyApp);

export default wrappedApp;
