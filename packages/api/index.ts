import { color } from "./src/color";
import { config } from "./src/config";
import { folder } from "./src/folder";
import { image } from "./src/image";
import { library } from "./src/library";
import { log } from "./src/log";
import { pending } from "./src/pending";
import { sync } from "./src/sync";
import { tag } from "./src/tag";
import { t } from "./src/utils";

export const router = t.router({
  config,
  library,
  pending,
  folder,
  sync,
  image,
  tag,
  color,
  log,
});

export type AppRouter = typeof router;
export { t } from "./src/utils";
