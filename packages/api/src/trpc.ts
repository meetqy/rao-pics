import * as trpc from "@trpc/server";
import superjson from "superjson";
import { ZodError } from "zod";

import { prisma } from "@acme/db";

export const createContext = () => {
  return { prisma };
};

export const t = trpc.initTRPC.context<typeof createContext>().create({
  transformer: superjson,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError: error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    };
  },
});
