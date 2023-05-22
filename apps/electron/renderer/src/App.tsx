import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TRPCClientError, type TRPCLink } from "@trpc/client";
import { type AnyRouter, type inferRouterError } from "@trpc/server";
import { observable } from "@trpc/server/observable";
import { type TRPCResultMessage } from "@trpc/server/rpc";
import { useState } from "react";
import superjson from "superjson";

import { IPCResponse } from "../../types";
import Home from "./Home";
import { trpc } from "./utils/trpc";

// from @trpc/client/src/links/internals/transformResult
// FIXME:
// - the generics here are probably unnecessary
// - the RPC-spec could probably be simplified to combine HTTP + WS
/** @internal */
function transformResult<TData>(response: IPCResponse) {
  if (response.status === "error") {
    return {
      ok: false,
      error: response.result,
    } as const;
  }

  const result = {
    type: "data",
    data: response.result,
  } as TRPCResultMessage<TData>["result"];
  return { ok: true, result } as const;
}

export function ipcLink<TRouter extends AnyRouter>(): TRPCLink<TRouter> {
  return (_runtime) =>
    ({ op }) => {
      return observable((observer) => {
        const promise = window.electronTRPC.rpc(op);
        promise
          .then((res) => {
            const transformed = transformResult(res);

            if (!transformed.ok) {
              observer.error(TRPCClientError.from(transformed.error as inferRouterError<TRouter>));
              return;
            }

            observer.next({
              result: transformed.result,
            });
            observer.complete();
          })
          .catch((cause: Error) => observer.error(TRPCClientError.from(cause)));

        return () => {
          // cancel promise here
        };
      });
    };
}

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
        <Home />
      </QueryClientProvider>
    </trpc.Provider>
  );
}

export default App;
