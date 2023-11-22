import { initTRPC } from "@trpc/server";
import type { CreateFastifyContextOptions } from "@trpc/server/adapters/fastify";
import SuperJSON from "superjson";

export const createContext = (_: CreateFastifyContextOptions) => ({});

export type Context = Awaited<ReturnType<typeof createContext>>;

export const t = initTRPC.context<Context>().create({
  transformer: SuperJSON,
});
