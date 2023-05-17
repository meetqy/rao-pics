import { libraryRouter } from "./router/library";
import { t } from "./trpc";

export { type LibraryAdd } from "./router/library";

export const appRouter = t.router({
  library: libraryRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
