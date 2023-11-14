import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createWSClient, httpBatchLink, wsLink } from "@trpc/client";
import SuperJSON from "superjson";

import { trpc } from "./trpc";

export function TRPCReactProvider(props: { children: React.ReactNode }) {
  const path = "localhost:9100/trpc";

  const [queryClient] = useState(() => new QueryClient());
  const [wsClient] = useState(() =>
    createWSClient({
      url: `ws://${path}`,
    }),
  );

  const [trpcClient] = useState(() =>
    trpc.createClient({
      transformer: SuperJSON,
      links: [
        httpBatchLink({
          url: `http://${path}`,
        }),

        wsLink({
          client: wsClient,
        }),
      ],
    }),
  );

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        {props.children}
      </QueryClientProvider>
    </trpc.Provider>
  );
}
