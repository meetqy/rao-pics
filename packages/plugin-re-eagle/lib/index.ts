import { getPrisma } from "@raopics/prisma-client";
import { join } from "path";
import fs from "fs";

const cacheFile = join(__dirname, "./.cache.json");

BigInt.prototype["toJSON"] = function () {
  return this.toString();
};

const cache = fs.existsSync(cacheFile) ? JSON.parse(fs.readFileSync(cacheFile, "utf-8")) : [];

const PLUGIN_RE_EAGLE = (library: string) => {
  const prisma = getPrisma(library);
  prisma.image
    .findMany({
      include: { tags: true, folders: true },
    })
    .then(async (res) => {
      for (const item of res) {
        if (cache.includes(item.id)) {
          continue;
        }

        cache.push(item.id);
        const data = {
          ...item,
          tags: item.tags.map((item) => item.name),
          folders: item.folders.map((item) => item.id),
          palettes: JSON.parse(item.palettes),
        };
        const file = join(library, "images", item.id + ".info", "metadata.json");

        try {
          fs.writeFileSync(file, JSON.stringify(data));
        } catch (e) {
          console.log(file);
        }
      }

      fs.writeFileSync(cacheFile, JSON.stringify(cache));
    });
};

export default PLUGIN_RE_EAGLE;
