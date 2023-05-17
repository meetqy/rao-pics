import * as trpc from "@trpc/server";

import { prisma } from "@acme/db";

export const createContext = () => {
  return { prisma };
};

export const t = trpc.initTRPC.context<typeof createContext>().create();
