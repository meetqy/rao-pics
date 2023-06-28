import fg from "fast-glob";

import { CONSTANT } from "@acme/constant";
import { type Library } from "@acme/db";

export const start = (library: Library) => {
  const entries = fg.sync(`${library.dir}/**/*.{${CONSTANT.EXT.join(",")}}`);
  console.log(entries);
};
