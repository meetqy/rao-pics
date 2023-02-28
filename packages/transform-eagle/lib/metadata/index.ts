import { join } from "path";
import * as chokidar from "chokidar";
import _ from "lodash";
import { readJsonSync } from "fs-extra";
import { handleFloder } from "./folder";
import { handleTagsGroups } from "./tags-groups";

const _wait = 5000;

const handleMetadata = (file: string) => {
  const json = readJsonSync(file);
  handleFloder(json["folders"]);
  handleTagsGroups(json["tagsGroups"]);
};

const _debounce = _.debounce(handleMetadata, _wait);

const watchMetaData = (LIBRARY: string) => {
  const file = join(LIBRARY, "./metadata.json");

  chokidar.watch(file).on("add", _debounce).on("change", _debounce);
};

export default watchMetaData;
