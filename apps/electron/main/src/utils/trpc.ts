import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import { type RequestInfo, type RequestInit } from "node-fetch";
import superjson from "superjson";

import { type AppRouter } from "@acme/api";

const fetch = (url: RequestInfo, init?: RequestInit) => import("node-fetch").then(({ default: fetch }) => fetch(url, init));

export const trpc = createTRPCProxyClient<AppRouter>({
  transformer: superjson,
  links: [httpBatchLink({ url: "http://localhost:6789", fetch })],
});
