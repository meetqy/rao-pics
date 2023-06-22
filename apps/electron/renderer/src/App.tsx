import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TRPCClientError, type TRPCLink } from "@trpc/client";
import { type AnyRouter, type inferRouterError } from "@trpc/server";
import { observable } from "@trpc/server/observable";
import { type TRPCResultMessage } from "@trpc/server/rpc";
import { ipcLink } from "electron-trpc/renderer";
import { useState } from "react";
import superjson from "superjson";

import { IPCResponse } from "../../types";
// import Home from "./Home";
import { trpc } from "./utils/trpc";

function App() {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() => {
    return trpc.createClient({
      transformer: superjson,
      links: [ipcLink()],
    });
  });

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <HelloElectron />
      </QueryClientProvider>
    </trpc.Provider>
  );
}

function HelloElectron() {
  const { data } = trpc.greeting.useQuery({ name: "Electron" });
  trpc.subscription.useSubscription(undefined, {
    onData: (data) => {
      console.log(data);
    },
  });

  if (!data) {
    return null;
  }

  return <div>{data.text}</div>;
}

export default App;
