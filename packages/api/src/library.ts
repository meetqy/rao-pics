import { EventEmitter } from "events";
import { join } from "path";
import { observable } from "@trpc/server/observable";
import chokidar from "chokidar";
import { debounce } from "lodash";
import { z } from "zod";

import type { PendingTypeEnum } from "@rao-pics/constant";
import type { Prisma } from "@rao-pics/db";
import { prisma } from "@rao-pics/db";

import { router } from "..";
import { updateStaticRoute } from "./server";
import { syncFolder } from "./sync";
import { t } from "./utils";

const ee = new EventEmitter();

let watcher: chokidar.FSWatcher | null = null;

export const libraryCore = {
  findUnique: async () => {
    const [library, pendingCount, syncCount, unSyncCount] =
      await prisma.$transaction([
        prisma.library.findFirst(),
        prisma.pending.count(),
        prisma.image.count(),
        prisma.log.count(),
      ]);

    if (!library) return null;

    return {
      ...library,
      pendingCount,
      syncCount,
      unSyncCount,
    };
  },
};

export const library = t.router({
  findUnique: t.procedure.query(libraryCore.findUnique),

  add: t.procedure.input(z.string()).mutation(async ({ input }) => {
    if (!input.endsWith(".library")) {
      throw new Error(`Must be a '.library' directory.`);
    }

    const res = await prisma.library.findMany({});
    if (res.length > 0) {
      throw new Error("Cannot add more than one library.");
    }

    const lib = await prisma.library.create({
      data: {
        path: input,
        type: "eagle",
      },
    });

    await updateStaticRoute(lib);

    return lib;
  }),

  update: t.procedure
    .input(
      z.object({
        lastSyncTime: z.date().optional(),
      }),
    )
    .mutation(async ({ input }) => {
      const json: Prisma.LibraryUpdateManyMutationInput = {};

      if (input.lastSyncTime) {
        json.lastSyncTime = input.lastSyncTime;
      }

      return await prisma.library.updateMany({
        data: json,
      });
    }),

  delete: t.procedure.mutation(async () => {
    if (watcher) {
      watcher.unwatch("*");
      watcher = null;
    }

    const result = await prisma.$transaction([
      prisma.library.deleteMany(),
      prisma.pending.deleteMany(),
      prisma.image.deleteMany(),
      prisma.tag.deleteMany(),
      prisma.folder.deleteMany(),
      prisma.log.deleteMany(),
      prisma.color.deleteMany(),
    ]);

    await updateStaticRoute(null);

    return result;
  }),

  /**
   * 监听 Library 变化
   */
  watch: t.procedure
    .input(
      z.object({
        path: z.string(),
        // 重启应用，需要等待一段时间，否则 onWatch 监听不到 emit start
        isReload: z.boolean().optional(),
        // 和数据库中的 isStartDiffLibrary 一样
        isStartDiffLibrary: z.boolean().optional(),
      }),
    )
    .mutation(({ input }) => {
      const { path: libraryPath, isReload, isStartDiffLibrary } = input;
      if (watcher) return;

      if (isReload) {
        setTimeout(() => {
          ee.emit("watch", { status: "start" });
        }, 1000);
      } else {
        ee.emit("watch", { status: "start" });
      }

      chokidar
        .watch(join(libraryPath, "metadata.json"))
        .on("change", (path) => {
          void syncFolder(path);
        });

      watcher = chokidar.watch(
        join(libraryPath, "images", "**", "metadata.json"),
      );

      const caller = router.createCaller({});
      const paths = new Set<{ path: string; type: PendingTypeEnum }>();

      const start = debounce(async () => {
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

        const config = await caller.config.findUnique();
        // 自动同步开启
        if (config?.autoSync) {
          await caller.sync.start({ libraryPath });
        }
      }, 1000);

      return watcher
        .on("add", (path) => {
          paths.add({ path, type: "create" });
          void start();
        })
        .on("change", (path) => {
          paths.add({ path, type: "update" });
          void start();
        })
        .on("unlink", (path) => {
          paths.add({ path, type: "delete" });
          void start();
        })
        .on("ready", () => {
          // 重启时对比资源库  关闭
          if (!isStartDiffLibrary && isReload) {
            paths.clear();
            void start();
          }
        });
    }),

  onWatch: t.procedure.subscription(() => {
    interface T {
      status: "ok" | "completed" | "error" | "start";
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
