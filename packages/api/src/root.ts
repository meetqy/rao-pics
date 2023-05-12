import { z } from "zod";

import { libraryRouter } from "./router/library";
import { t } from "./trpc";

export { type LibraryAdd } from "./router/library";

export const appRouter = t.router({
  library: libraryRouter,
  greeting: t.procedure.input(z.object({ name: z.string() }).nullish()).query(({ input }) => {
    return `hello tRPC v10, ${input?.name ?? "world"}!`;
  }),
});

// export type definition of API
export type AppRouter = typeof appRouter;
