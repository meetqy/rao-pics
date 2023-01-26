import { ensureSymlinkSync } from "fs-extra";

ensureSymlinkSync(process.env.LIBRARY + "/images", "./public/library");

console.log("library 软连接创建成功！");
