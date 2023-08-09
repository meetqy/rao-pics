import { config } from "./src/router/config";
import { fail } from "./src/router/fail";
import { folders } from "./src/router/folder";
import { image } from "./src/router/image";
import { library } from "./src/router/library";
import { pending } from "./src/router/pending";
import { sync } from "./src/router/sync";
import { tags } from "./src/router/tags";
import { utils } from "./src/router/utils";
import { t } from "./src/trpc";

export * from "./src/router/library";
export { type ExtEnum } from "./src/router/image/get";

export const appRouter = t.router({
  library,
  tags,
  image,
  folders,
  config,
  sync,
  pending,
  utils,
  fail,
});

// export type definition of API
export type AppRouter = typeof appRouter;
