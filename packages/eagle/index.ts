import fs from "fs-extra";
import { globby } from "globby";

import { type Library } from "@acme/db";

import { handleFolder } from "./folder";
import { handleImage } from "./image";
import { handleTagsGroups } from "./tagsGroups";
import { type LibraryMetadata } from "./types";

export const start = async (library: Library) => {
  const images = await globby(`${library.dir}/images/**/metadata.json`);
  const base = fs.readJsonSync(`${library.dir}/metadata.json`) as LibraryMetadata;

  await handleFolder(base.folders, library);
  await handleTagsGroups(base.tagsGroups, library);

  await handleImage(images, library);
};
