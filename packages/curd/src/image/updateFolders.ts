import differenceBy from "lodash.differenceby";

/**
 * 更新文件夹
 * @param folders 新的文件夹
 * @param oldFolders 修改之前的文件夹
 * @returns prisma 更新文件夹的参数
 */
export const updateFolders = (folders: { id: string }[], oldFolders: { id: string }[]) => {
  const waitDeleteIds = folders.length === 0 ? oldFolders : differenceBy(oldFolders, folders, "id");

  return {
    disconnect: waitDeleteIds.map((f) => ({ id: f.id })),
    connect: folders.map((f) => ({ id: f.id })),
  };
};
