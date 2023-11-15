import { z } from "zod";

import { prisma } from "@rao-pics/db";

import { folderCore } from "./folder";
import { t } from "./utils";

export const configInput = {
  upsert: z.object({
    language: z.enum(["zh-cn", "en-us", "zh-tw"]).optional(),
    theme: z.string().optional(),
    color: z.string().optional(),
    serverPort: z.number().optional(),
    clientPort: z.number().optional(),
    ip: z.string().optional(),
    pwdFolder: z.boolean().optional(),
    trash: z.boolean().optional(),
    startDiffLibrary: z.boolean().optional(),
    autoSync: z.boolean().optional(),
  }),
};

export const configCore = {
  findUnique: async () =>
    await prisma.config.findFirst({ where: { name: "config" } }),

  // pwdFolder 更新逻辑
  // 1. config.pwdFolder = true
  // 2. 修改 folder.password != null 的 folder.show = true
  //    2.1 如果修改的是父级 folder, 则需要同步修改子级 folder
  // 3. 查询 Folder 时，只需要返回 folder.show = true 的 folder
  upsert: async (input: z.infer<typeof configInput.upsert>) => {
    const { pwdFolder } = input;

    if (pwdFolder != undefined) {
      await folderCore.setPwdFolderShow(pwdFolder);
    }

    return await prisma.config.upsert({
      where: { name: "config" },
      update: input,
      create: input,
    });
  },
};

export const config = t.router({
  upsert: t.procedure
    .input(configInput.upsert)
    .mutation(({ input }) => configCore.upsert(input)),

  findUnique: t.procedure.query(configCore.findUnique),
});
