import { config } from "./src/config";
import { t } from "./src/utils";

export { t } from "./src/utils";

export const router = t.router({
  config,
});

export type AppRouter = typeof router;
