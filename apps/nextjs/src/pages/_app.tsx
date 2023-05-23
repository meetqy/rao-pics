import "../styles/globals.css";
import type { AppType } from "next/app";
import { useEffect } from "react";

import { trpc } from "~/utils/trpc";

const MyApp: AppType = ({ Component, pageProps: pageProps }) => {
  useEffect(() => {
    process.env["NEXT_PUBLIC_API_URL"] = `http://${location.hostname}:${process.env["NEXT_PUBLIC_ASSETS_PORT"]}`;
  }, []);

  return <Component {...pageProps} />;
};

export default trpc.withTRPC(MyApp);
