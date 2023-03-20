import { logger } from "@raopics/utils";
import { readFileSync, writeFileSync } from "fs-extra";
import _ from "lodash";

// 触发 raopics.db 让fs.watch能监听到
export const trigger = _.debounce(() => {
  const file = process.env.LIBRARY + "/raopics.db";
  const content = readFileSync(file);
  writeFileSync(file, content);
  logger.info("Trigger file update");
}, 10000);
