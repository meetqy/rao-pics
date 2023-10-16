import type { ReactNode } from "react";
import { useEffect } from "react";
import type { AppProps } from "next/app";
import Head from "next/head";
import { RecoilRoot, useRecoilState } from "recoil";

import Setting from "~/components/Setting";
import type { SettingType } from "~/states/setting";
import { settingSelector } from "~/states/setting";

import "~/styles/globals.css";

import { trpc } from "~/utils/trpc";

function InitState({ children }: { children: ReactNode }) {
  const [, setSetting] = useRecoilState(settingSelector);

  useEffect(() => {
    const local = localStorage.getItem("setting");
    setSetting(
      (local
        ? JSON.parse(local)
        : {
            layout: "masonry",
            orderBy: {
              mtime: "desc",
            },
          }) as SettingType,
    );
  }, [setSetting]);

  return children;
}

function App({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
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
        <link rel="icon" href="/logo.svg" />
        <title>Gallery for Rao Pics</title>
      </Head>
      <InitState>
        <Component {...pageProps} />
        <Setting />
      </InitState>
    </RecoilRoot>
  );
}

export default trpc.withTRPC(App);
