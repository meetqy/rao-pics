import { homedir } from "os";
import { join } from "path";
import { app } from "electron";

import { PRODUCT_NAME } from ".";

/**
 * 退出程序
 */
export const exit = () => {
  process.env.QUITE = "true";
  app.quit();
};

/**
 * 是否是开发环境
 */
export const IS_DEV = process.env.NODE_ENV != "production";

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
 * sqlite.db 存放目录，不同的系统存放目录不同
 */
const DB_DIRS = {
  darwin: formatDirPath(
    join(homedir(), "Library", "Caches", PRODUCT_NAME, "db.sqlite"),
  ),
  win32: formatDirPath(
    join(homedir(), "AppData", "Local", PRODUCT_NAME, "db.sqlite"),
  ),
  linux: formatDirPath(join(homedir(), ".cache", PRODUCT_NAME, "db.sqlite")),
} as { [key in NodeJS.Platform]: string };

/**
 * 当前系统的数据库文件存放路径
 */
export const DB_PATH = DB_DIRS[PLATFORM];

/**
 * 数据库版本存放目录
 */
const DB_MIGRATION_VERSION_FILES = {
  darwin: formatDirPath(
    join(homedir(), "Library", "Caches", PRODUCT_NAME, ".version"),
  ),
  win32: formatDirPath(
    join(homedir(), "AppData", "Local", PRODUCT_NAME, ".version"),
  ),
  linux: formatDirPath(join(homedir(), ".cache", PRODUCT_NAME, ".version")),
} as { [key in NodeJS.Platform]: string };

/**
 * 当前系统数据库版本存放路径
 */
export const DB_MIGRATION_VERSION_FILE = DB_MIGRATION_VERSION_FILES[PLATFORM];
