import { prisma, type Library, type Prisma } from "@acme/db";

import { type EagleEmit } from ".";
import { type Folder } from "./types";

export const handleFolder = async (folders: Folder[], library: Library, emit?: EagleEmit) => {
  const f = treeToArray(folders);

  for (const [index, folder] of f.entries()) {
    const input: Prisma.FolderCreateInput = {
      ...folder,
      library: { connect: { id: library.id } },
    };

    await prisma.folder.upsert({
      where: { id: folder.id },
      update: input,
      create: input,
    });
    emit && emit("folder", index + 1, f.length);
  }

  // 清除已经删除，sqlite中还存在的文件夹。
  await prisma.folder.deleteMany({
    where: {
      id: {
        notIn: f.map((folder) => folder.id),
      },
    },
  });
};

const treeToArray = (folders: Folder[]) => {
  const newFolders: Folder[] = [];

  const callback = (item: Folder) => {
    (item.children || (item.children = [])).forEach((v) => {
      v.pid = item.id;
      callback(v);
    });

    delete item.children;
    delete item.tags;
    newFolders.push(item);
  };

  folders.map((v) => callback(v));
  return newFolders;
};
