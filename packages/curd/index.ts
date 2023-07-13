import { Color, ColorInput } from "./src/color";
import { Config, ConfigInput } from "./src/config";
import { Fail, FailInput } from "./src/fail";
import { Folder, FolderInput } from "./src/folder";
import { Image, ImageInput } from "./src/image";
import { Library, LibraryInput } from "./src/library";
import { Pending, PendingInput } from "./src/pending";
import { Tag, TagInput } from "./src/tag";
import { Util } from "./src/util";

export const ZodInput = {
  folder: FolderInput,
  tag: TagInput,
  config: ConfigInput,
  library: LibraryInput,
  image: ImageInput,
  color: ColorInput,
  pending: PendingInput,
  fail: FailInput,
};

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
  image: Image,
  color: Color,
  pending: Pending,
  fail: Fail,
  util: Util,
};

export default curd;
