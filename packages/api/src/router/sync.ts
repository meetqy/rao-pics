import { EventEmitter } from "events";
import { observable } from "@trpc/server/observable";
import { z } from "zod";

import curd from "@acme/curd";
import { start as startEagle } from "@acme/eagle";

import { t } from "../trpc";

const ee = new EventEmitter();

export const sync = t.router({
  start: t.procedure
    .input(
      z.object({
        libraryId: z.number(),
      }),
    )
    .mutation(async ({ input }) => {
      const res = await curd.library.get({ library: input.libraryId });
      const lib = res[0];

      if (lib) {
        // start syncing
        await startEagle({
          library: lib,
          emit: (e) => {
            ee.emit("sync", {
              current: e.current,
              count: e.count,
              failCount: e.failCount,
              libraryId: lib.id,
              type: e.type,
            });
          },
        });

        return true;
      }

      return false;
    }),

  subscription: t.procedure.subscription(() => {
    return observable((emit) => {
      function onGreet(obj: { current: number; count: number; failCount: number; libraryId: number; type: "folder" | "image" }) {
        emit.next(obj);
      }

      ee.on("sync", onGreet);

      return () => {
        ee.off("sync", onGreet);
      };
    });
  }),
});
