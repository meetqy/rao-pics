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
        notIn: folders.map((folder) => folder.id),
      },
    },
  });
};

const treeToArray = (folders: Folder[]) => {
  const arr: Folder[] = [];

  folders.map((item) => {
    if (item.children) {
      d(item.children);
    }

    delete item.children;
    arr.push(item);
  });

  const d = (children: Folder[]) => {
    children.map((item) => {
      if (item.children) {
        d(item.children);
      }

      delete item.children;
      arr.push(item);
    });
  };

  return arr;
};
