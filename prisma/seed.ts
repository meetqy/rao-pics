import { PrismaClient } from "@prisma/client";
import * as dotenv from "dotenv";
import { join } from "path";
import { initImage } from "./seed/image";
import { initMetadata } from "./seed/metadata";
import { initTag } from "./seed/tag";
dotenv.config({ path: join(__dirname, "../.env") });

const prisma = new PrismaClient();

function main() {
  process.env.WATCH_REPLACE_DATABASE_FILE = "false";
  initMetadata(prisma);
  initTag(prisma);
  initImage(prisma);
}

main();
export {};
