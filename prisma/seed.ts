import { getPrisma } from "@/lib/prisma";
import * as dotenv from "dotenv";
import { join } from "path";
import { initImage } from "./seed/image";
import { initMetadata } from "./seed/metadata";
import { initTag } from "./seed/tag";

const prisma = getPrisma();

dotenv.config({
  path: join(__dirname, `../.env.${process.env.NODE_ENV || "development"}`),
});

function main() {
  initMetadata(prisma);
  initTag(prisma);
  initImage(prisma);
}

main();
