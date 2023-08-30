import chokidar from "chokidar";

import { router } from "@rao-pics/api";

const caller = router.createCaller({});

let watcher: chokidar.FSWatcher;

/**
 * 监听 library 变化
 * @param path 监听的 library 路径
 * @returns
 */
export const watchLibrary = (path: string) => {
  let conut = 0;

  if (watcher) return Promise.resolve(conut);

  watcher = chokidar.watch(path);

  return new Promise((reslove, reject) => {
    watcher
      .on("add", (path) => {
        conut++;
        void caller.pending.upsert({ path, type: "create" });
      })
      .on("change", (path) => {
        void caller.pending.upsert({ path, type: "update" });
      })
      .on("unlink", (path) => {
        void caller.pending.upsert({ path, type: "delete" });
      })
      .on("error", reject)
      .on("ready", () => {
        reslove(conut);
      });
  });
};
