import * as trpc from "@trpc/server";
import { type CreateFastifyContextOptions } from "@trpc/server/adapters/fastify";

import { prisma } from "@acme/db";

export const createContext = (args?: CreateFastifyContextOptions) => {
  return {
    ...args,
    prisma,
  };
};

export type Context = trpc.inferAsyncReturnType<typeof createContext>;

export const t = trpc.initTRPC.context<Context>().create();
