import { PrismaClient } from "@prisma/client";
import * as dotenv from "dotenv";
import { join } from "path";
import { initImage } from "./seed/image";
import { initMetadata } from "./seed/metadata";
dotenv.config({ path: join(__dirname, "../.env") });

const prisma = new PrismaClient();

function main() {
  initImage(prisma);
  initMetadata(prisma);
}

main();
export {};
