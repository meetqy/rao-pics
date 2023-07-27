import difference from "lodash.difference";
import uniqBy from "lodash.uniqby";

import curd from "@acme/curd";
import { type Library } from "@acme/db";

import { type EmitOption, type Folder } from "../types";

export const handleFolder = async (folders: Folder[], lib: Library, emit?: (option: EmitOption) => void) => {
  // 相同的文件夹，只保留一个
  const f = uniqBy(treeToArray(folders), "name");

  const oldFolders = await curd.folder.get({ library: lib.id });
  const oldFolderIds = oldFolders.map((v) => v.id);

  if (f.length === 0) {
    await curd.folder.delete({ libraryId: lib.id });
    return;
  }

  for (const [index, folder] of f.entries()) {
    await curd.folder.upsert({
      id: folder.id,
      name: folder.name,
      libraryId: lib.id,
    });

    emit?.({
      type: "folder",
      current: index + 1,
    });
  }

  const ids = difference(
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
  const namesJson: { [key in string]: number } = {};

  const calcNumReturnNewFolder = (item: Folder) => {
    const nameNum = (namesJson[item.name] || 0) + 1;
    namesJson[item.name] = nameNum;

    if (nameNum > 1) {
      item.name = `${item.name}-${nameNum - 1}`;
    }

    return item;
  };

  const callback = (item: Folder) => {
    (item.children || (item.children = [])).forEach((v) => {
      v.name = item.name + "／" + v.name;

      callback(v);
    });

    delete item.children;
    newFolders.push(calcNumReturnNewFolder(item));
  };

  folders.map((v) => callback(v));

  return newFolders;
};
