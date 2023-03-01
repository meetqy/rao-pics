import { logger } from "@eagleuse/utils";
import { trigger } from "../trigger";
import { getPrisma, Folder } from "@eagleuse/prisma-client";

const prisma = getPrisma();

// 多级嵌套转为一级
const demotionFolder = (folders: EagleUse.Folder[]): Folder[] => {
  const newFolders = [];

  const callback = (item) => {
    (item.children || (item.children = [])).map((v) => {
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

export const handleFloder = async (metadataFolders: EagleUse.Folder[]) => {
  const folders = demotionFolder(metadataFolders);

  folders.forEach((folder) => {
    prisma.folder
      .upsert({
        where: { id: folder.id },
        update: folder,
        create: folder,
      })
      .catch((e) => logger.info(e, "Folder error: "));

    trigger();
  });

  deleteUnnecessary(folders);
};

const deleteUnnecessary = (localFolder: Folder[]) => {
  prisma.folder
    .findMany({
      where: {
        id: {
          notIn: localFolder.map((item) => item.id),
        },
      },
    })
    .then((folders) => {
      if (folders && folders.length > 0) {
        prisma.folder
          .deleteMany({
            where: {
              id: {
                in: folders.map((item) => item.id),
              },
            },
          })
          .catch((e) => {
            logger.error(e, "Delete folder error: ");
          });
      }
    });
  trigger();
};
