import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createTRPCReact } from "@trpc/react-query";
import { ipcLink } from "electron-trpc/renderer";
import superjson from "superjson";

import type { AppRouter } from "@rao-pics/api";

const trpcReact = createTRPCReact<AppRouter>();

function App() {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpcReact.createClient({
      links: [ipcLink()],
      transformer: superjson,
    }),
  );

  return (
    <trpcReact.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <HelloElectron />
      </QueryClientProvider>
    </trpcReact.Provider>
  );
}

function HelloElectron() {
  const { data } = trpcReact.greeting.useQuery({ name: "Electron" });
  const [sub, setSub] = useState<string>();
  trpcReact.subscription.useSubscription(undefined, {
    onData: (data) => {
      const text = (data as { text: string }).text;
      setSub(text);
    },
  });

  if (!data) {
    return null;
  }

  return (
    <div>
      <div>subscription message: {sub}</div>
      <div>{data.text}</div>
    </div>
  );
}

export default App;
