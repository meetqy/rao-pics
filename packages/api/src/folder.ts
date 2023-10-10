import { z } from "zod";

import { prisma } from "@rao-pics/db";

import { configCore } from "./config";
import { t } from "./utils";

export const folderInput = {
  find: z
    .object({
      id: z.string().optional(),
      pid: z.string().optional(),
    })
    .optional(),
  upsert: z.object({
    id: z.string(),
    name: z.string(),
    description: z.string().optional(),
    pid: z.string().optional(),
    password: z.string().optional(),
    passwordTips: z.string().optional(),
    show: z.boolean().optional().default(true),
  }),

  setPwdFolderShow: z.boolean(),
};

export const folderCore = {
  find: async (input: z.infer<typeof folderInput.find>) => {
    if (input?.id) {
      return await prisma.folder.findUnique({
        where: { id: input.id, show: true },
      });
    }

    if (input?.pid) {
      return await prisma.folder.findMany({
        where: { pid: input.pid, show: true },
      });
    }

    return await prisma.folder.findMany({
      where: { show: true },
    });
  },

  upsert: async (input: z.infer<typeof folderInput.upsert>) => {
    const { password } = input;
    const config = await configCore.findUnique();

    if (password) {
      input.show = config?.pwdFolder ?? false;
    }

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

    return await prisma.folder.upsert({
      where: { id: input.id },
      create: input,
      update: input,
    });
  },

  setPwdFolderShow: async (
    input: z.infer<typeof folderInput.setPwdFolderShow>,
  ) => {
    return await prisma.folder.updateMany({
      where: {
        password: {
          not: "",
        },
      },
      data: {
        show: input,
      },
    });
  },
};

export const folder = t.router({
  upsert: t.procedure
    .input(folderInput.upsert)
    .mutation(async ({ input }) => folderCore.upsert(input)),

  find: t.procedure
    .input(folderInput.find)
    .query(async ({ input }) => folderCore.find(input)),

  setPwdFolderShow: t.procedure
    .input(folderInput.setPwdFolderShow)
    .mutation(async ({ input }) => folderCore.setPwdFolderShow(input)),
});
