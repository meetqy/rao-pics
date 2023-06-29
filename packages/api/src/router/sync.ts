import { EventEmitter } from "events";
import { observable } from "@trpc/server/observable";
import { z } from "zod";

import { type Constant } from "@acme/constant";
import curd from "@acme/curd";
import { start as startEagle } from "@acme/eagle";

// import { start as startFolder } from "@acme/folder";

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
        const type = lib.type as Constant["app"];

        // start syncing
        switch (type) {
          case "eagle": {
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

          case "folder": {
            // startFolder(lib);
            return false;
          }

          default: {
            return false;
          }
        }
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
