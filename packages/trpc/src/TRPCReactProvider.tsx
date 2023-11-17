import { useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createWSClient, httpLink, splitLink, wsLink } from "@trpc/client";
import SuperJSON from "superjson";

import { trpc } from "./trpc";

export const TRPCReactProvider = (props: { children: React.ReactNode }) => {
  const [host, setHost] = useState<string>();

  useEffect(() => {
    const getConfig = () => {
      fetch("/common/config")
        // Prod
        .then((res) => res.json())
        .then((data: { ip: string; serverPort: number }) => {
          const { ip, serverPort } = data;
          setHost(`${ip}:${serverPort}`);
        })
        .catch(() => {
          // Dev
          void fetch("http://localhost:61122/common/config")
            .then((res) => res.json())
            .then((data: { ip: string; serverPort: number }) => {
              const { ip, serverPort } = data;
              setHost(`${ip}:${serverPort}`);
            });
        });
    };

    void getConfig();
  }, []);

  return host && <Core host={host}>{props.children}</Core>;
};

function Core({ children, host }: { children: React.ReactNode; host: string }) {
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
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </trpc.Provider>
  );
}
