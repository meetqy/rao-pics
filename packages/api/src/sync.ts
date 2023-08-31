import { EventEmitter } from "events";
import { observable } from "@trpc/server/observable";
import { z } from "zod";

import { handleFolder } from "@rao-pics/eagle";

import { router } from "..";
import { t } from "./utils";

const ee = new EventEmitter();

export const sync = t.router({
  start: t.procedure
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
      await syncFolder(folders, caller);

      return true;
    }),

  onStart: t.procedure.subscription(() => {
    interface T {
      status: "ok" | "completed" | "error";
      type: "folder" | "image";
      data?: { id: string; name: string };
      count: number;
      message?: string;
    }

    return observable<T>((emit) => {
      function onGreet(data: T) {
        emit.next(data);
      }

      ee.on("start", onGreet);

      return () => {
        ee.off("start", onGreet);
      };
    });
  }),
});

export const syncFolder = async (
  folders: ReturnType<typeof handleFolder>,
  caller: ReturnType<typeof router.createCaller>,
) => {
  let count = 0;
  for (const f of folders) {
    count++;
    await caller.folder.upsert(f);
    ee.emit("start", { status: "ok", type: "folder", data: f, count });
  }

  ee.emit("start", { status: "completed", type: "folder" });
};
