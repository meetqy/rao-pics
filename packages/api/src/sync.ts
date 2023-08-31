import { EventEmitter } from "events";
import { observable } from "@trpc/server/observable";
import { z } from "zod";

import { handleFolder } from "@rao-pics/eagle";

import { router } from "..";
import { t } from "./utils";

const ee = new EventEmitter();

export const sync = t.router({
  sync: t.procedure
    .input(
      z.object({
        libraryPath: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      const caller = router.createCaller({});
      const pendings = await caller.pending.get();

      // 同步文件夹
      const folders = handleFolder(input.libraryPath);
      let count = 0;
      for (const f of folders) {
        count++;
        await caller.folder.upsert(f);
        ee.emit("sync", { status: "ok", type: "folder", data: f, count });
      }
      ee.emit("sync", { status: "completed", type: "folder" });

      return { ok: true };
    }),

  onSync: t.procedure.subscription(() => {
    interface T {
      status: "ok" | "completed";
      type: "folder" | "image";
      data?: { id: string; name: string };
      count: number;
    }

    return observable<T>((emit) => {
      function onGreet(data: T) {
        emit.next(data);
      }

      ee.on("sync", onGreet);

      return () => {
        ee.off("sync", onGreet);
      };
    });
  }),
});
