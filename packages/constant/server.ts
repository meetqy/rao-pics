import { homedir } from "os";
import { join } from "path";

import { PRODUCT_NAME } from ".";

/**
 * 是否为开发环境，不要通过 process.env.NODE_ENV 判断
 * 直接调用此变量
 */
export const IS_DEV = process.env.NODE_ENV === "development";

/**
 * 当前平台
 */
export const PLATFORM = process.platform;

/**
 * @rao-pics/constants 中所有的目录必须调用此方法格式化
 * @param dir
 */
const formatDirPath = (dir: string) => {
  return dir.replace(/\s/g, "");
};

/**
 * App UserData 数据存放目录，不同的系统存放目录不同
 */
const APP_USERDATA_DIRS = {
  darwin: IS_DEV
    ? join(__dirname, "..", "db", "prisma", "migrations")
    : formatDirPath(join(homedir(), "Library", "Caches", PRODUCT_NAME)),
  win32: IS_DEV
    ? join(__dirname, "..", "db", "prisma", "migrations")
    : formatDirPath(join(homedir(), "AppData", "Local", PRODUCT_NAME)),
  linux: IS_DEV
    ? join(__dirname, "..", "db", "prisma", "migrations")
    : formatDirPath(join(homedir(), ".cache", PRODUCT_NAME)),
} as { [key in NodeJS.Platform]: string };

/**
 * 当前系统的数据库文件存放路径
 */
export const DB_PATH = join(APP_USERDATA_DIRS[PLATFORM], "db.sqlite");

/**
 * 当前系统数据库版本存放路径
 */
export const DB_MIGRATION_VERSION_FILE = join(
  APP_USERDATA_DIRS[PLATFORM],
  ".version",
);
