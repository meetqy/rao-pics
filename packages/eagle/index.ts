import * as fs from "fs";
import * as fg from "fast-glob";

import { type Library } from "@acme/db";

import { handleFolder } from "./folder";
import { handleImage } from "./image";
import { handleTagsGroup } from "./tagsGroup";
import { type LibraryMetadata } from "./types";

export type EagleEmitOption = { type: "folder" | "tagsGroup" | "image"; current: number; count: number };
export type EagleEmit = (option: EagleEmitOption) => void;

export const start = async (library: Library, emit?: EagleEmit) => {
  const base = JSON.parse(fs.readFileSync(`${library.dir}/metadata.json`, "utf-8")) as LibraryMetadata;
  const images = fg.sync(`${library.dir}/images/**/metadata.json`);

  await handleFolder(base.folders, library, emit);
  await handleTagsGroup(base.tagsGroups, library, emit);

  await handleImage(images, library, emit);
};
