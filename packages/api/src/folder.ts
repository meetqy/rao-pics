import { z } from "zod";

import { prisma } from "@rao-pics/db";

import { configCore } from "./config";
import { flatToTree } from "./sync/folder";
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
    show: z.boolean().default(true).optional(),
  }),

  setPwdFolderShow: z.boolean(),
};

export const folderCore = {
  find: async (input?: z.infer<typeof folderInput.find>) => {
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

  /**
   * 修改所有有密码的文件夹的 show
   * 子级的 show 保持和父级一致
   * 父级有密码，子项没有，子项也会设置为 父级 相同的 show
   */
  setPwdFolderShow: async (
    input: z.infer<typeof folderInput.setPwdFolderShow>,
  ) => {
    // 所有有密码的文件夹
    const pFolders = await prisma.folder.findMany({
      where: { password: { not: "" } },
    });

    // 父级文件有密码、子级没有密码的文件夹 id
    const pids = pFolders.filter((f) => !f.pid).map((f) => f.id);

    const childFolders = await prisma.folder.findMany({
      where: {
        pid: {
          in: pids,
        },
      },
    });

    return await prisma.folder.updateMany({
      where: {
        id: {
          in: pFolders.concat(childFolders).map((item) => item.id),
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

  findTree: t.procedure.query(async () => {
    const folders = await prisma.folder.findMany({
      where: { show: true },
      orderBy: { id: "desc" },
      select: {
        id: true,
        pid: true,
        name: true,
        description: true,
        passwordTips: true,
        _count: { select: { images: true } },
      },
    });

    return flatToTree<(typeof folders)[number]>(folders);
  }),

  findWithPwd: t.procedure.query(async () => {
    return await prisma.folder.findMany({
      where: { password: { not: "" } },
    });
  }),
});
