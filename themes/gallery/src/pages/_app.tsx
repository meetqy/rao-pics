import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import type { AppProps } from "next/app";
import Head from "next/head";
import { RecoilRoot, useRecoilState } from "recoil";

import Setting from "~/components/Setting/index";
import type { SettingType } from "~/states/setting";
import { defaultSetting, settingSelector } from "~/states/setting";

import "~/styles/globals.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink, httpLink } from "@trpc/client";
import SuperJSON from "superjson";

import { trpc } from "~/utils/trpc";

function InitState({ children }: { children: ReactNode }) {
  const [, setSetting] = useRecoilState(settingSelector);

  useEffect(() => {
    const local = localStorage.getItem("setting");
    setSetting((local ? JSON.parse(local) : defaultSetting) as SettingType);
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

const Trpc = (appProps: AppProps) => {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpc.createClient({
      transformer: SuperJSON,
      links: [
        httpBatchLink({
          url: "http://localhost:9100/trpc",
        }),
      ],
    }),
  );

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <App {...appProps} />
      </QueryClientProvider>
    </trpc.Provider>
  );
};

export default Trpc;
