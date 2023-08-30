import { EventEmitter } from "events";
import { observable } from "@trpc/server/observable";
import chokidar from "chokidar";
import { z } from "zod";

import { Pending, Prisma, prisma } from "@rao-pics/db";

import { router } from "..";
import { t } from "./utils";

const ee = new EventEmitter();

export const library = t.router({
  get: t.procedure.query(async () => {
    return await prisma.library.findFirst();
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
    return await prisma.library.deleteMany();
  }),

  /**
   * 监听 Library 变化
   */
  watch: t.procedure.input(z.string()).mutation(({ input }) => {
    const watcher = chokidar.watch(input);
    const caller = router.createCaller({});

    watcher
      .on("add", (path) => {
        void caller.pending.upsert({ path, type: "create" });
        ee.emit("watch", { status: "ok", data: { path, type: "create" } });
      })
      .on("change", (path) => {
        void caller.pending.upsert({ path, type: "update" });
        ee.emit("watch", { status: "ok", data: { path, type: "update" } });
      })
      .on("unlink", (path) => {
        void caller.pending.upsert({ path, type: "delete" });
        ee.emit("watch", { status: "ok", data: { path, type: "delete" } });
      })
      .on("error", (e) => {
        throw Error(e.message);
      })
      .on("ready", () => {
        ee.emit("watch", { status: "completed" });
      });
  }),

  onWatch: t.procedure.subscription(() => {
    interface T {
      status: "ok" | "process";
      data?: { path: string; type: "create" | "update" | "delete" };
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
