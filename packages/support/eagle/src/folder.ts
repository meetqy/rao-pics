import _ from "lodash";

import curd from "@acme/curd";
import { type Library } from "@acme/db";

import { type EmitOption, type Folder } from "../types";

export const handleFolder = async (folders: Folder[], lib: Library, emit?: (option: EmitOption) => void) => {
  const f = treeToArray(folders);

  const oldFolders = await curd.folder.get({ libraryId: lib.id });
  const oldFolderIds = oldFolders.map((v) => v.id);

  if (f.length === 0) {
    await curd.folder.delete({ libraryId: lib.id });
    return;
  }

  for (const [index, folder] of f.entries()) {
    await curd.folder.upsert({
      folderId: folder.id,
      name: folder.name,
      libraryId: lib.id,
    });

    emit?.({
      type: "folder",
      current: index + 1,
      failCount: 0,
      count: f.length,
    });
  }

  const ids = _.difference(
    oldFolderIds,
    f.map((folder) => folder.id),
  );

  // 清除已经删除，sqlite中还存在的文件夹。
  for (const id in ids.entries()) {
    await curd.folder.delete({ id });
  }
};

const treeToArray = (folders: Folder[]) => {
  const newFolders: Folder[] = [];

  const callback = (item: Folder) => {
    (item.children || (item.children = [])).forEach((v) => {
      callback(v);
    });

    delete item.children;
    newFolders.push(item);
  };

  folders.map((v) => callback(v));
  return newFolders;
};
