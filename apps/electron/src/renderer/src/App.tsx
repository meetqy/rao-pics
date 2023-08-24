import React, { useState } from "react";
import { ipcLink } from "electron-trpc/renderer";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import superjson from "superjson";

import { NavBar } from "./components/NavBar";
import Home from "./pages/Home";
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
        <div className="flex h-screen w-screen flex-col overflow-hidden">
          <NavBar name="资源库名字" platform="darwin" />

          <div className="flex flex-1">
            <Home />
          </div>
        </div>
      </QueryClientProvider>
    </trpc.Provider>
  );
}

export default App;
