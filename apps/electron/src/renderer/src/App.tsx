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
  const utils = trpcReact.useContext();
  const { data } = trpcReact.greeting.useQuery({ name: "Electron" });
  const { data: users } = trpcReact.getUsers.useQuery();
  const createUser = trpcReact.createUser.useMutation({
    onSuccess: () => utils.getUsers.invalidate(),
  });

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
      <table>
        <thead>
          <tr>
            <th>id</th>
            <th>email</th>
            <th>name</th>
          </tr>
        </thead>
        <tbody>
          {users?.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.email}</td>
              <td>{item.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={() => createUser.mutate()}>添加</button>
      <div>subscription message: {sub}</div>
      <div>{data.text}</div>
    </div>
  );
}

export default App;
