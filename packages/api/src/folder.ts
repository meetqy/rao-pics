import { z } from "zod";

import { prisma } from "@rao-pics/db";

import { t } from "./utils";

export const folderInput = {
  find: z
    .object({
      id: z.string().optional(),
      pid: z.string().optional(),
    })
    .optional(),
};

export const folderCore = {
  find: async (input: z.infer<typeof folderInput.find>) => {
    if (input?.id) {
      return await prisma.folder.findUnique({
        where: { id: input.id },
      });
    }

    if (input?.pid) {
      return await prisma.folder.findMany({
        where: { pid: input.pid },
      });
    }

    return await prisma.folder.findMany();
  },
};

export const folder = t.router({
  upsert: t.procedure
    .input(
      z.object({
        id: z.string(),
        name: z.string(),
        description: z.string().optional(),
        pid: z.string().optional(),
        password: z.string().optional(),
        passwordTips: z.string().optional(),
        show: z.boolean().optional().default(true),
      }),
    )
    .mutation(async ({ input }) => {
      const { password, show } = input;

      if (password) {
        input.show = false;
      }

      if (show) {
        // 更新 show, 需要同步更新子文件夹中的 show
        await prisma.folder.updateMany({
          where: {
            OR: [
              // 父级在 upsert 中更新
              // { id: input.id },
              { pid: input.id },
            ],
          },
          data: {
            show: input.show,
          },
        });
      }

      return await prisma.folder.upsert({
        where: { id: input.id },
        create: input,
        update: input,
      });
    }),

  find: t.procedure
    .input(folderInput.find)
    .query(async ({ input }) => folderCore.find(input)),
});
