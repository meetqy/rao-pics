import React, { useState } from "react";
import { ipcLink } from "electron-trpc/renderer";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import superjson from "superjson";

import Layout from "./Layout";
import { trpc } from "./utils/trpc";

function App() {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [ipcLink()],
      transformer: superjson,
    }),
  );

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <Layout />
      </QueryClientProvider>
    </trpc.Provider>
  );
}

export default App;
