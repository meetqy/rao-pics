import { configResponsive } from "ahooks";

import "../styles/globals.css";
import NextAdapterPages from "next-query-params/pages";
import type { AppType } from "next/app";
import { QueryParamProvider } from "use-query-params";

import { trpc } from "~/utils/trpc";

configResponsive({
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
});

const MyApp: AppType = ({ Component, pageProps: pageProps }) => {
  return (
    <QueryParamProvider adapter={NextAdapterPages}>
      <Component {...pageProps} />
    </QueryParamProvider>
  );
};

export default trpc.withTRPC(MyApp);
