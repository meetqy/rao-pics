import { config } from "./src/config";
import { folder } from "./src/folder";
import { image } from "./src/image";
import { library } from "./src/library";
import { pending } from "./src/pending";
import { sync } from "./src/sync";
import { t } from "./src/utils";

export const router = t.router({
  config,
  library,
  pending,
  folder,
  sync,
  image,
});

export type AppRouter = typeof router;
export { t } from "./src/utils";
