import fg from "fast-glob";
import fs from "fs-extra";

import { type Library } from "@acme/db";

import { handleFolder } from "./folder";
import { handleImage } from "./image";
import { handleTagsGroup } from "./tagsGroup";
import { type LibraryMetadata } from "./types";

export type EagleEmit = (type: "folder" | "tagsGroup" | "image", current: number, count: number) => void;

export const start = async (library: Library, emit?: EagleEmit) => {
  const base = fs.readJsonSync(`${library.dir}/metadata.json`) as LibraryMetadata;
  const images = fg.sync(`${library.dir}/images/**/metadata.json`);

  await handleFolder(base.folders, library, emit);
  await handleTagsGroup(base.tagsGroups, library);

  await handleImage(images, library);
};