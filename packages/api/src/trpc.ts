import * as trpc from "@trpc/server";

import { prisma } from "@acme/db";

export const createContext = async () => {
  return Promise.resolve({
    prisma,
  });
};

export type Context = trpc.inferAsyncReturnType<typeof createContext>;

export const t = trpc.initTRPC.context<Context>().create();
