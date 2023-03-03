import { logger } from "@eagleuse/utils";
import fs from "fs-extra";
import { join } from "path";

export const createSymlink = (library: string) => {
  if (!library) throw Error("LIBRARY is null!");

  const target = join(__dirname, "../public/library");

  fs.removeSync(target);
  fs.ensureSymlinkSync(library, target);
  logger.info("Create library symlink, target: " + target);
};
