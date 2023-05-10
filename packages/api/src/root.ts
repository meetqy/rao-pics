import { z } from "zod";

import { exampleRouter } from "./router/example";
import { t } from "./trpc";

export const appRouter = t.router({
  example: exampleRouter,
  greeting: t.procedure
    .input(z.object({ name: z.string() }).nullish())
    .query(({ input }) => {
      return `hello tRPC v10, ${input?.name ?? "world"}!`;
    }),
});

// export type definition of API
export type AppRouter = typeof appRouter;
