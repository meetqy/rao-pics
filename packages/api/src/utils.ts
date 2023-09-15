import type { inferAsyncReturnType } from "@trpc/server";
import { initTRPC } from "@trpc/server";
import type * as trpcExpress from "@trpc/server/adapters/express";
import superjson from "superjson";

export type Context = inferAsyncReturnType<typeof createContext>;

export const createContext = (
  _p: trpcExpress.CreateExpressContextOptions,
) => ({});

export const t = initTRPC.context<Context>().create({
  transformer: superjson,
});
