import { join } from "path";
import { readJSONSync } from "fs-extra";

export const handleFolder = (libraryPath: string) => {
  const f = readJSONSync(join(libraryPath, "metadata.json")) as {
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
}

export const treeToFlat = (folderTree: FolderTree[]) => {
  const flat: {
    name: string;
    id: string;
    description?: string;
    pid?: string;
  }[] = [];

  const callback = (folderTree: FolderTree[]) => {
    folderTree.forEach((folder) => {
      flat.push({
        name: folder.name,
        id: folder.id,
        description: folder.description,
        pid: folder.pid,
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
