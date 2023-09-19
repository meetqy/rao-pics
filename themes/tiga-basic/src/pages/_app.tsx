import type { AppProps } from "next/app";
import Head from "next/head";

import "~/styles/globals.css";

import { trpc } from "~/utils/trpc";

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="application-name" content="PWA App" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="PWA App" />
        <meta name="description" content="Best PWA App in the world" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-config" content="/icons/browserconfig.xml" />
        <meta name="msapplication-TileColor" content="#2B5797" />
        <meta name="msapplication-tap-highlight" content="no" />
        <meta name="theme-color" content="#fff" />

        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/icons/icon_rounded/icon_512x512.png" />
        <title>Tiga Basic for Rao Pics</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default trpc.withTRPC(App);
