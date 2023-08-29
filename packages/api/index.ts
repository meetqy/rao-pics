import { config } from "./src/config";
import { library } from "./src/library";
import { t } from "./src/utils";

export { t } from "./src/utils";

export const router = t.router({
  config,
  library,
});

export type AppRouter = typeof router;
