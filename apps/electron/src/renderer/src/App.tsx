import React, { useState } from "react";
import { ipcLink } from "electron-trpc/renderer";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useRecoilState } from "recoil";
import superjson from "superjson";

import Layout from "./Layout";
import { themeState } from "./state";
import { trpc } from "./utils/trpc";

function App() {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [ipcLink()],
      transformer: superjson,
    }),
  );

  const [theme] = useRecoilState(themeState);

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <div
          data-theme={theme}
          className="h-screen w-screen overflow-hidden rounded bg-base-100"
        >
          <Layout />
        </div>
      </QueryClientProvider>
    </trpc.Provider>
  );
}

export default App;
