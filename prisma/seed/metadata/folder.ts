import { PrismaClient } from "@prisma/client";
import { readJSONSync } from "fs-extra";
import _ from "lodash";

// 最后一次的文件，
// 如果删除了，进行比对
// 删除sqlite中的数据
let lastFoldersCache = [];

// 多级嵌套转为一级
const demotionFolder = (folders: { [key: string]: string }[]) => {
  let newFolders = [];

  const callback = (item) => {
    (item.children || (item.children = [])).map((v) => {
      v.pid = item.id;
      callback(v);
    });

    item.children = item.children.map((item) => item.id);
    newFolders.push(item);
  };

  folders.map((v) => callback(v));
  return newFolders;
};

const handleFolderItem = (json) => {
  return {
    ...json,
    children: JSON.stringify(json.children),
    tags: JSON.stringify(json.tags),
  };
};

const Folder = {
  add: (prisma: PrismaClient, file) => {
    const json = readJSONSync(file);
    lastFoldersCache = demotionFolder(json["folders"]);

    lastFoldersCache.map((item) => {
      const data = handleFolderItem(item);
      prisma.folder
        .upsert({
          where: {
            id: item.id,
          },
          create: data,
          update: data,
        })
        .then((folder) => {
          console.log("create folder with id: ", folder.id);
        });
    });
  },

  change: (prisma: PrismaClient, file) => {
    const json = readJSONSync(file);
    const newFolders = demotionFolder(json["folders"]);
    // 当次操作的状态
    let optStatus;

    if (newFolders.length > lastFoldersCache.length) {
      optStatus = "add";
    } else if (newFolders.length === lastFoldersCache.length) {
      optStatus = "update";
    } else {
      optStatus = "delete";
    }

    // 不同的文件夹 每次执行 应该只有一条
    const diffFolder = _.differenceWith(
      lastFoldersCache,
      newFolders,
      _.isEqual
    );

    lastFoldersCache = newFolders;

    if (optStatus === "add") {
      prisma.folder
        .create({
          data: diffFolder[0],
        })
        .then((folder) => {
          console.log("add folder with id: ", folder.id);
        });
    } else if (optStatus === "delete") {
      prisma.folder
        .delete({
          where: {
            id: diffFolder[0].id,
          },
        })
        .then((folder) => {
          console.log("update folder with id: ", folder.id);
        });
    } else {
      prisma.folder
        .update({
          where: {
            id: diffFolder[0].id,
          },
          data: diffFolder[0],
        })
        .then((folder) => {
          console.log("update folder with id: ", folder.id);
        });
    }
  },
};

export default Folder;
