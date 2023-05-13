import { prisma, type Library, type Prisma } from "@acme/db";

import { type Folder } from "./types";

export const handleFolder = async (folders: Folder[], library: Library) => {
  const f = treeToArray(folders);

  for (const folder of f) {
    const input: Prisma.FolderCreateInput = {
      ...folder,
      library: { connect: { id: library.id } },
    };

    await prisma.folder.upsert({
      where: { id: folder.id },
      update: input,
      create: input,
    });
  }

  // 清除sqlite中已经存在的文件夹
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
