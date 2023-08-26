import { initTRPC } from "@trpc/server";
import superjson from "superjson";

import { config } from "./src/config";

const t = initTRPC.create({ isServer: true, transformer: superjson });

export const router = t.router({
  config,
});

export type AppRouter = typeof router;
