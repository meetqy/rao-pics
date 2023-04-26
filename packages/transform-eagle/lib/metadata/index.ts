import { join } from "path";
import * as chokidar from "chokidar";
import _ from "lodash";
import { readJsonSync } from "fs-extra";
import { handleFloder } from "./folder";
import { handleTagsGroups } from "./tags-groups";
import { WAIT_TIME } from "../constant";

const handleMetadata = (file: string) => {
  const json = readJsonSync(file);
  handleFloder(json["folders"]);
  handleTagsGroups(json["tagsGroups"]);
};

const _debounce = _.debounce(handleMetadata, WAIT_TIME);

const watchMetaData = (LIBRARY: string, ready: () => void) => {
  const file = join(LIBRARY, "./metadata.json");

  chokidar.watch(file).on("add", _debounce).on("change", _debounce).on("ready", ready);
};

export default watchMetaData;
