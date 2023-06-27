import { Config, ConfigInput } from "./src/config";
import { Folder, FolderInput } from "./src/folder";
import { Library, LibraryInput } from "./src/library";
import { Tag, TagInput } from "./src/tag";

export const ZodInput = {
  folder: FolderInput,
  tag: TagInput,
  config: ConfigInput,
  library: LibraryInput,
};

// library id => libraryId
// image id => imageId
// folder id => folderId
// tag id => tagId
// config id => configId

// images id => imageIds
// folders id => folderIds
// tags id => tagIds
// libraries id => libraryIds

/**
 * curd object
 * common properties curd.xxx.[get|delete|update|create|clear|connect|disconnect|upsert]
 * refer: https://github.com/rao-pics/core/issues/217
 */
const curd = {
  folder: Folder,
  tag: Tag,
  config: Config,
  library: Library,
};

export default curd;
