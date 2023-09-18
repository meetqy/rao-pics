import type { AppProps } from "next/app";
import Head from "next/head";

import "~/styles/globals.css";

import { trpc } from "~/utils/trpc";

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default trpc.withTRPC(App);
