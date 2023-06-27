import { Config, ConfigInput } from "./src/config";
import { Folder, FolderInput } from "./src/folder";
import { Tag, TagInput } from "./src/tag";

export const ZodInput = {
  folder: FolderInput,
  tag: TagInput,
  config: ConfigInput,
};

/**
 * curd object
 * https://github.com/rao-pics/core/issues/217
 */
const curd = {
  folder: Folder,
  tag: Tag,
  config: Config,
};

export default curd;
