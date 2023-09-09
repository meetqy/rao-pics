import type { AppProps } from "next/app";

import "~/styles/globals.css";

import { trpc } from "~/utils/trpc";

function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default trpc.withTRPC(App);
