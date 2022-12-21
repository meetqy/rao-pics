import { ensureSymlinkSync } from "fs-extra";
import { join } from "path";
import * as dotenv from "dotenv";
dotenv.config({ path: join(__dirname, "../.env") });

ensureSymlinkSync(
  process.env.LIBRARY + "/images",
  join(__dirname, `../public/library`)
);
console.log("library 软连接创建成功！");
