import fs from "fs-extra";
import pino from "pino";
import pretty from "pino-pretty";
import { join } from "path";
import * as dotenv from "dotenv";

dotenv.config({ path: join(__dirname, "../.env") });
const { ensureSymlinkSync, removeSync } = fs;

const logger = pino(pretty());
const library = "./public/library";

removeSync(library);
ensureSymlinkSync(join(process.env.LIBRARY, "./images"), library);
logger.info("create library symlink success");
