import * as trpc from "@trpc/server";
import superjson from "superjson";
import { ZodError } from "zod";

export const t = trpc.initTRPC.create({
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
