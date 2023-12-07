import { sep } from "path";
import { PrismaClient } from "@prisma/client";
import fs from "fs-extra";

import { DB_PATH, IS_DEV } from "@rao-pics/constant/server";

/**
 * connection_limit=1 解决 prisma.*.delete 报错
 * prisma.pending.delete({ where: { path: input } }); 报错
 * https://www.prisma.io/docs/guides/performance-and-optimization/connection-management
 * https://github.com/prisma/prisma/issues/11789
 * FIX: https://github.com/meetqy/rao-pics/issues/552
 */

const _prisma: PrismaClient = new PrismaClient(
  !IS_DEV
    ? {
        datasources: {
          db: { url: `file:${DB_PATH}?connection_limit=1` },
        },
      }
    : undefined,
);

/**
 * 创建 Db 目录， 如果不存在
 * @param defaultPath ...db.sqlite
 */
export const createDbPath = (defaultPath: string) => {
  if (!fs.existsSync(defaultPath)) {
    throw new Error(`defaultPath: ${defaultPath} not exist`);
  }

  if (fs.pathExistsSync(DB_PATH)) return;

  fs.ensureDirSync(DB_PATH.split(sep).slice(0, -1).join(sep));
  fs.copySync(defaultPath, DB_PATH, {
    overwrite: false,
  });
};

export * from "./migrate";
export * from "@prisma/client";

export const prisma = _prisma;
