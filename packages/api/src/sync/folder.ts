import { readJSONSync } from "fs-extra";

export const handleFolder = (path: string) => {
  const f = readJSONSync(path) as {
    folders: FolderTree[];
  };

  return treeToFlat(f.folders);
};

interface FolderTree {
  name: string;
  id: string;
  description?: string;
  pid?: string;
  children: FolderTree[];
  password?: string;
  passwordTips?: string;
}

export const treeToFlat = (folderTree: FolderTree[]) => {
  const flat: {
    name: string;
    id: string;
    description?: string;
    pid?: string;
    password?: string;
    passwordTips?: string;
  }[] = [];

  const callback = (folderTree: FolderTree[]) => {
    folderTree.forEach((folder) => {
      flat.push({
        name: folder.name,
        id: folder.id,
        description: folder.description,
        pid: folder.pid,
        password: folder.password ?? undefined,
        passwordTips: folder.passwordTips ?? undefined,
      });
      if (folder.children.length > 0) {
        callback(
          folder.children.map((child) => ({ ...child, pid: folder.id })),
        );
      }
    });
  };

  callback(folderTree);

  return flat;
};

export function flatToTree<
  T extends { id: string | number; pid: string | number | null },
>(flat: T[], parent?: string | number) {
  return flat.reduce(
    (r, item) => {
      if (parent == item.pid) {
        const obj = { ...item, children: flatToTree(flat, item.id) };

        r.push(obj);
      }

      return r;
    },
    [] as (T & { children: T[] })[],
  );
}
