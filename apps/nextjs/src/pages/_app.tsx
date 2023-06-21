import { configResponsive } from "ahooks";

import "../styles/globals.css";
import NextAdapterPages from "next-query-params/pages";
import type { AppType } from "next/app";
import { QueryParamProvider } from "use-query-params";

import { trpc } from "~/utils/trpc";

configResponsive({
  xs: 0,
  sm: 376,
  md: 641,
  lg: 769,
  xl: 1025,
  xxl: 1537,
});

const MyApp: AppType = ({ Component, pageProps: pageProps }) => {
  return (
    <QueryParamProvider adapter={NextAdapterPages}>
      <Component {...pageProps} />
    </QueryParamProvider>
  );
};

export default trpc.withTRPC(MyApp);
