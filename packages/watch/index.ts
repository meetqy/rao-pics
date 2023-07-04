import chokidar from "chokidar";

import curd from "@acme/curd";

const watcher: { [key in number]: chokidar.FSWatcher } = {};

interface Props {
  libraryId: number;
  paths: string;
  options?: chokidar.WatchOptions;
}

function startWatcher(props: Props): Promise<number> {
  const { libraryId, paths, options } = props;

  watcher[libraryId] = chokidar.watch(paths, options);

  const w = watcher[libraryId];

  if (!w) return Promise.resolve(0);

  let count = 0;

  return new Promise((resolve) => {
    w
      // listener
      .on("add", (path) => {
        count++;
        void curd.pending.upsert({ path, libraryId, type: "create" });
      })
      .on("unlink", (path) => {
        void curd.pending.upsert({ path, libraryId, type: "delete" });
      })
      .on("change", (path) => {
        void curd.pending.upsert({ path, libraryId, type: "update" });
      })
      .on("ready", () => {
        resolve(count);
      });
  });
}

export default startWatcher;
