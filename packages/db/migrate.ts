import { join } from "path";
import fs from "fs-extra";

import { DB_MIGRATION_VERSION_FILE, IS_DEV } from "@rao-pics/constant/server";

import { prisma } from ".";

const diffMigrate = async (migratesPath: string, file: string) => {
  const oldVersion = fs.readFileSync(file, "utf-8");

  const dirs = fs.readdirSync(migratesPath);
  const latestVersion = dirs[dirs.length - 2];
  if (!latestVersion) return;

  // 不存在 .version 文件，设置为当前的版本
  if (!fs.existsSync(file)) {
    latestVersion && fs.writeFileSync(file, latestVersion);
  } else {
    if (oldVersion === latestVersion) return;

    const sqls = fs
      .readFileSync(join(migratesPath, latestVersion, "migration.sql"), "utf-8")
      .split(";\n")
      .map((sql) => sql.replace(/(\n)?--.*?\n/, ""))
      .filter(Boolean)
      .map(
        (sql) =>
          eval(`prisma.$executeRaw\`${sql};\``) as ReturnType<
            typeof prisma.$executeRaw
          >,
      );

    return await prisma.$transaction(sqls);
  }
};

// TODO: 跨多个版本的迁移，暂未实现
export const migrate = async () => {
  if (IS_DEV) {
    const migratesPath = join(
      __dirname,
      "../../../../",
      "packages",
      "db",
      "prisma",
      "migrations",
    );

    return await diffMigrate(migratesPath, join(migratesPath, ".version"));
  } else {
    // TODO: 打包之后的 migrations 目录
    return await diffMigrate("xxx", DB_MIGRATION_VERSION_FILE);
  }
};
