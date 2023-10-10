import { color } from "./src/color";
import { config, configCore } from "./src/config";
import { folder, folderCore } from "./src/folder";
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

export const routerCore = {
  config: configCore,
  folder: folderCore,
};

export type AppRouter = typeof router;
export { t } from "./src/utils";
export * from "./src/express";

let caller: ReturnType<typeof router.createCaller>;

/**
 * router.createCaller()
 * @returns
 */
export const getCaller = () => {
  if (!caller) {
    caller = router.createCaller({});
  }

  return caller;
};
