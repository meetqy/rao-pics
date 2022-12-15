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
          // console.log("init folder with id: ", folder.id);
        });
    });
  },

  change: (prisma: PrismaClient, file) => {
    const json = readJSONSync(file);
    const newFolders = demotionFolder(json["folders"]);

    // 当次操作的状态 >0 新增 || <0 删除 =0 修改
    const optStatus = newFolders.length - lastFoldersCache.length;

    let diffFolder = [];
    if (optStatus > 0) {
      diffFolder = _.differenceWith(newFolders, lastFoldersCache, _.isEqual);
    } else if (optStatus < 0) {
      diffFolder = _.differenceWith(lastFoldersCache, newFolders, _.isEqual);
    } else {
      diffFolder = _.differenceWith(newFolders, lastFoldersCache, _.isEqual);
    }

    lastFoldersCache = newFolders;

    diffFolder.map((f) => {
      const item = handleFolderItem(f);
      if (optStatus > 0) {
        prisma.folder
          .upsert({
            where: {
              id: item.id,
            },
            create: item,
            update: item,
          })
          .then((folder) => {
            console.log("upsert folder with id: ", folder.id);
          });
      } else if (optStatus < 0) {
        prisma.folder
          .delete({
            where: {
              id: item.id,
            },
          })
          .then((folder) => {
            console.log("delete folder with id: ", folder.id);
          });
      } else {
        prisma.folder
          .update({
            where: {
              id: item.id,
            },
            data: item,
          })
          .then((folder) => {
            console.log("update folder with id: ", folder.id);
          });
      }
    });
  },
};

export default Folder;
