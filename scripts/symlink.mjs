import fs from "fs-extra";
import pino from "pino";
import pretty from "pino-pretty";
import { join } from "path";
const { ensureSymlinkSync, removeSync } = fs;

const logger = pino(pretty());
const library = "./public/library";

const symlink = () => {
  removeSync(library);
  ensureSymlinkSync(join(process.env.LIBRARY, "./images"), library);
  logger.info("library 软链接创建成功！");
};

export default symlink;
