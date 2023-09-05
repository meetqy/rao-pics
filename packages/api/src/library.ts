import { EventEmitter } from "events";
import { observable } from "@trpc/server/observable";
import chokidar from "chokidar";
import { z } from "zod";

import type { PendingTypeEnum } from "@rao-pics/constant";
import { prisma } from "@rao-pics/db";

import { router } from "..";
import { t } from "./utils";

const ee = new EventEmitter();

let watcher: chokidar.FSWatcher;

export const library = t.router({
  get: t.procedure.query(async () => {
    const [library, pendingCount] = await prisma.$transaction([
      prisma.library.findFirst(),
      prisma.pending.count(),
    ]);

    if (!library) return null;

    return {
      ...library,
      pendingCount,
    };
  }),

  add: t.procedure.input(z.string()).mutation(async ({ input }) => {
    if (!input.endsWith(".library")) {
      throw new Error(`Must be a '.library' directory.`);
    }

    const res = await prisma.library.findMany({});
    if (res.length > 0) {
      throw new Error("Cannot add more than one library.");
    }

    return await prisma.library.create({
      data: {
        path: input,
        type: "eagle",
      },
    });
  }),

  delete: t.procedure.mutation(async () => {
    if (watcher) {
      watcher.unwatch("*");
    }

    return await prisma.$transaction([
      prisma.library.deleteMany(),
      prisma.pending.deleteMany(),
      prisma.image.deleteMany(),
      prisma.tag.deleteMany(),
      prisma.folder.deleteMany(),
      prisma.log.deleteMany(),
    ]);
  }),

  /**
   * 监听 Library 变化
   */
  watch: t.procedure.input(z.string()).mutation(async ({ input }) => {
    watcher = chokidar.watch(input);

    const caller = router.createCaller({});

    const paths = new Set<{ path: string; type: PendingTypeEnum }>();

    const startWatcher = () => {
      return new Promise<void>((reslove, reject) => {
        return watcher
          .on("add", (path) => {
            paths.add({ path, type: "create" });
          })
          .on("change", (path) => {
            paths.add({ path, type: "update" });
          })
          .on("unlink", (path) => {
            paths.add({ path, type: "delete" });
          })
          .on("error", (e) => {
            reject(new Error(e.message));
          })
          .on("ready", () => {
            void (async () => {
              let count = 0;

              for (const path of paths) {
                count++;

                try {
                  await caller.pending.upsert(path);
                  ee.emit("watch", { status: "ok", data: path, count });
                } catch (e) {
                  ee.emit("watch", {
                    status: "error",
                    data: path,
                    count,
                    message: (e as Error).message,
                  });
                }
              }

              paths.clear();
              ee.emit("watch", { status: "completed" });
              reslove();
            })();
          });
      });
    };

    return await startWatcher();
  }),

  onWatch: t.procedure.subscription(() => {
    interface T {
      status: "ok" | "completed" | "error";
      data?: { path: string; type: PendingTypeEnum };
      message?: string;
      count: number;
    }

    return observable<T>((emit) => {
      function onGreet(data: T) {
        emit.next(data);
      }

      ee.on("watch", onGreet);

      return () => {
        ee.off("watch", onGreet);
      };
    });
  }),
});
