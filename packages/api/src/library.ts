import { EventEmitter } from "events";
import { observable } from "@trpc/server/observable";
import chokidar from "chokidar";
import { z } from "zod";

import { prisma } from "@rao-pics/db";

import type { PendingTypeEnum } from "..";
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
    ]);
  }),

  /**
   * 监听 Library 变化
   */
  watch: t.procedure.input(z.string()).mutation(({ input }) => {
    watcher = chokidar.watch(input);
    const caller = router.createCaller({});

    const paths = new Set<{ path: string; type: PendingTypeEnum }>();

    watcher
      .on("add", (path) => {
        paths.add({ path, type: "create" });
        void caller.pending.upsert({ path, type: "create" });
      })
      .on("change", (path) => {
        paths.add({ path, type: "update" });
      })
      .on("unlink", (path) => {
        paths.add({ path, type: "delete" });
      })
      .on("error", (e) => {
        throw Error(e.message);
      })
      .on("ready", () => {
        void (async () => {
          let count = 0;

          for (const path of paths) {
            count++;
            await caller.pending.upsert(path);
            ee.emit("watch", { status: "ok", data: path, count });
          }

          paths.clear();
          ee.emit("watch", { status: "completed" });
        })();
      });
  }),

  onWatch: t.procedure.subscription(() => {
    interface T {
      status: "ok" | "completed";
      data?: { path: string; type: PendingTypeEnum; count: number };
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
