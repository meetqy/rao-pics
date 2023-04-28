import { join } from "path";
import * as chokidar from "chokidar";
import _ from "lodash";
import { readJsonSync } from "fs-extra";
import { logger } from "@raopics/utils";
import { getPrisma } from "@raopics/prisma-client";

const _wait = 5000;

export const handleStarredTags = (file: string) => {
  const json = readJsonSync(file);
  const localTags: string[] = json["starredTags"];

  getPrisma()
    .tag.updateMany({
      where: {
        id: { in: localTags },
      },
      data: {
        starred: true,
      },
    })
    .catch((e) => logger.error(e, "Starred tag error: "));

  deleteUnnecessary(localTags);
};

export const deleteUnnecessary = (localTags: string[]) => {
  getPrisma()
    .tag.findMany({
      where: {
        id: {
          notIn: localTags.map((item) => item),
        },
      },
    })
    .then((tags) => {
      if (tags && tags.length > 0) {
        getPrisma()
          .tag.updateMany({
            where: {
              id: {
                in: tags.map((item) => item.id),
              },
            },
            data: {
              starred: false,
            },
          })
          .catch((e) => logger.error(e, "Starred tag error: "));
      }
    });
};

const _debounce = _.debounce(handleStarredTags, _wait);

const watchStarredTags = (LIBRARY: string) => {
  const file = join(LIBRARY, "./tags.json");

  return new Promise((resolve) => {
    return chokidar.watch(file).on("add", _debounce).on("change", _debounce).on("ready", resolve);
  });
};

export default watchStarredTags;
