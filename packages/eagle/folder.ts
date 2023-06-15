import { Curd } from "@acme/curd";
import { prisma, type Library } from "@acme/db";

import { type EagleEmit } from ".";
import { type Folder } from "./types";

export const handleFolder = async (folders: Folder[], library: Library, emit?: EagleEmit) => {
  const f = treeToArray(folders);

  if (f.length === 0) {
    await Curd(prisma).folder().clear();

    return;
  }

  for (const [index, folder] of f.entries()) {
    await Curd(prisma).folder().upsert({
      id: folder.id,
      name: folder.name,
      libraryId: library.id,
    });

    emit &&
      emit({
        type: "folder",
        current: index + 1,
        count: f.length,
      });
  }

  // 清除已经删除，sqlite中还存在的文件夹。
  await Curd(prisma)
    .folder()
    .delete({
      libraryId: library.id,
      ids: f.map((folder) => folder.id),
      idsRule: "notIn",
    });
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
