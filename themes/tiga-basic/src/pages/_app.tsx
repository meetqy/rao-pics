import type { AppProps } from "next/app";
import Head from "next/head";

import "~/styles/globals.css";

import { trpc } from "~/utils/trpc";

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        {/* IOS https://developer.apple.com/library/archive/documentation/AppleApplications/Reference/SafariHTMLRef/Articles/MetaTags.html */}
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />
        {/* 会影响状态栏文字颜色 时间 信号 WIFI */}
        <meta name="theme-color" content="#fff" />
        <meta name="apple-mobile-web-app-capable" content="yes" />

        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
        />

        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/icons/icon_rounded/icon_512x512.png" />
        <title>Tiga Theme for RaoPics</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default trpc.withTRPC(App);
