import chokidar from "chokidar";
import { PrismaClient } from "@prisma/client";
import pretty from "pino-pretty";
import pino from "pino";

const logger = pino(pretty());

// PrismaClient is attached to the `global` object in development to prevent
// exhausting your database connection limit.

let watcher: boolean;
let prisma: PrismaClient;

if (!prisma) {
  prisma = new PrismaClient();
}

watcherDB();

// 部署在服务器中时，同步library到服务器 eagleuse.db 发生改变
// 需要重新 new PrismaClient。
// db watch 监听中，不需要重新 new PrismaClient
function watcherDB() {
  if (watcher) return;
  if (process.env.WATCH_REPLACE_DATABASE_FILE !== "true") return;

  logger.info("listening eagleuse.db");

  chokidar.watch(process.env.LIBRARY + "/eagleuse.db").on("change", () => {
    prisma = new PrismaClient();
    logger.info(`reload "new PrismaClient()"`);
  });

  watcher = true;
}

// Prisma Studio or Data Browser: Do not know how to serialize a BigInt
// https://github.com/prisma/studio/issues/614
(BigInt.prototype as { [key in string] }).toJSON = function () {
  const int = Number.parseInt(this.toString());
  return int ?? this.toString();
};

//
export const getPrisma = () => prisma;

export default prisma;
