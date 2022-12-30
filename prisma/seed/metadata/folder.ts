import { PrismaClient } from "@prisma/client";
import _ from "lodash";

// folder 修改缓存
// 1.add 文件监听中会加入到lastFolderCache
// 2.change 更新lastFolderCache
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

    delete item.children;
    newFolders.push(item);
  };

  folders.map((v) => callback(v));
  return newFolders;
};

const handleFolderItem = (json) => {
  return {
    ...json,
    tags: {
      connectOrCreate: json.tags.map((tag) => ({
        where: {
          id: tag,
        },
        create: {
          name: tag,
          id: tag,
        },
      })),
    },
  };
};

const Folder = {
  add: (prisma: PrismaClient, json: { [key in string]: any }) => {
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

  change: (prisma: PrismaClient, json: { [key in string]: any }) => {
    const newFolders = demotionFolder(json["folders"]);

    // 当次操作的状态 >0 新增, <0 删除, =0 修改
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
