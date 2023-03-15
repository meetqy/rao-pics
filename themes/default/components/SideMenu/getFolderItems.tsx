import { ItemType } from "antd/es/menu/hooks/useItems";

function foldersTreeTransformItems(tree: EagleUse.FolderTree[]): ItemType[] {
  if (tree.length > 0) {
    return tree.map((item) => {
      const json: ItemType = {
        label: item.name,
        key: item.id,
        children: item.children ? foldersTreeTransformItems(item.children) : [],
      };

      return json;
    });
  }

  return [];
}

export const getFolderItems = (tree: EagleUse.FolderTree[]) => {
  return {
    label: `文件夹`,
    key: "/folders",
    type: "group",
    children: foldersTreeTransformItems(tree) || [],
  };
};
