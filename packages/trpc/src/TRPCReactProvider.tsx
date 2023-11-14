import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createWSClient, httpLink, splitLink, wsLink } from "@trpc/client";
import SuperJSON from "superjson";

import { trpc } from "./trpc";

export function TRPCReactProvider(props: { children: React.ReactNode }) {
  const host = "localhost:61121";

  const [queryClient] = useState(() => new QueryClient());
  const [wsClient] = useState(() =>
    createWSClient({ url: `ws://${host}/trpc` }),
  );

  const [trpcClient] = useState(() =>
    trpc.createClient({
      transformer: SuperJSON,
      links: [
        splitLink({
          condition: (op) => op.type === "subscription",
          true: wsLink({ client: wsClient }),
          false: httpLink({ url: `http://${host}/trpc` }),
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
