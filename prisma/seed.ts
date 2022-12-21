import { PrismaClient } from "@prisma/client";
import * as dotenv from "dotenv";
import { ensureSymlinkSync } from "fs-extra";
import { join } from "path";
import { initImage } from "./seed/image";
import { initMetadata } from "./seed/metadata";
import { initTag } from "./seed/tag";
dotenv.config({ path: join(__dirname, "../.env") });

const prisma = new PrismaClient();

function main() {
  initImage(prisma);
  initMetadata(prisma);
  initTag(prisma);

  ensureSymlinkSync(process.env.LIBRARY, join(__dirname, `../public/library`));
  console.log("library 软连接创建成功！");
}

main();
export {};
