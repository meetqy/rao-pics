import fs from "fs-extra";
import { join } from "path";
import * as dotenv from "dotenv";
import logger from "@/utils/logger";

dotenv.config({ path: join(__dirname, "../.env") });
const { ensureSymlinkSync, removeSync } = fs;

const library = "./public/library";

removeSync(library);
ensureSymlinkSync(join(process.env.LIBRARY, "./images"), library);
logger.info("create library symlink success");
