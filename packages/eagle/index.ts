import fg from "fast-glob";
import fs from "fs-extra";

import { type Library } from "@acme/db";

import { handleFolder } from "./folder";
import { handleImage } from "./image";
import { handleTagsGroup } from "./tagsGroup";
import { type LibraryMetadata } from "./types";

export const start = async (library: Library) => {
  const base = fs.readJsonSync(`${library.dir}/metadata.json`) as LibraryMetadata;
  const images = fg.sync(`${library.dir}/images/**/metadata.json`);

  await handleFolder(base.folders, library);
  await handleTagsGroup(base.tagsGroups, library);

  await handleImage(images, library);
};
