import { z } from "zod";

import curd from "@acme/curd";

import { t } from "../trpc";

export const utils = t.router({
  /**
   * 合适时机检查未同步的文件是否在同步中存在，存在就删除
   * https://github.com/rao-pics/rao-pics/issues/301
   */
  checkFailAndClean: t.procedure
    .input(
      z.object({
        libraryId: z.number(),
        libraryDir: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      const fails = await curd.fail.get(input);

      if (fails.length === 0) return;

      for (const fail of fails) {
        const res = await curd.image.get({
          pathStartsWith: fail.path.replace(/.*?images/, "images").replace("/metadata.json", ""),
        });

        const item = res[0];

        if (item) {
          const failPath = item.path.split("/");
          failPath.pop();
          console.log("failPath", `${input.libraryDir}/${failPath.join("/") + "/metadata.json"}`);

          void curd.fail.delete({
            path: `${input.libraryDir}/${failPath.join("/") + "/metadata.json"}`,
          });
        }
      }

      return;
    }),
});
