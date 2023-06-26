/* eslint-disable */

import { resolve } from "path";
import fs from "fs-extra";

const targetPath = resolve(process.cwd(), "package.json");

const pkg = fs.readJsonSync(targetPath);
const { version } = fs.readJsonSync(resolve(process.cwd(), "../../package.json"));

pkg["version"] = version;

fs.writeJsonSync(targetPath, pkg, { spaces: 2 });
