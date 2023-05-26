import "../styles/globals.css";
import NextAdapterPages from "next-query-params/pages";
import type { AppType } from "next/app";
import { QueryParamProvider } from "use-query-params";

import { trpc } from "~/utils/trpc";

const MyApp: AppType = ({ Component, pageProps: pageProps }) => {
  return (
    <QueryParamProvider adapter={NextAdapterPages}>
      <Component {...pageProps} />
    </QueryParamProvider>
  );
};

export default trpc.withTRPC(MyApp);
