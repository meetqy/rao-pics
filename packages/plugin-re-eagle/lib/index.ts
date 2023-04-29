import { getPrisma } from "@raopics/prisma-client";
import fs from "fs";
import { join } from "path";

BigInt.prototype["toJSON"] = function () {
  return this.toString();
};

const PLUGIN_RE_EAGLE = (library: string) => {
  const prisma = getPrisma(library);
  prisma.image
    .findMany({
      include: { tags: true, folders: true },
    })
    .then(async (res) => {
      for (const item of res) {
        const data = {
          ...item,
          tags: item.tags.map((item) => item.name),
          folders: item.folders.map((item) => item.id),
          palettes: JSON.parse(item.palettes),
        };
        fs.writeFileSync(join(library, "images", item.id + ".info", "metadata.json"), JSON.stringify(data));
      }
    });
};

export default PLUGIN_RE_EAGLE;
