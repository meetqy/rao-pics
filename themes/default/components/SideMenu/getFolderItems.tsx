import { ItemType } from "antd/es/menu/hooks/useItems";

function foldersTreeTransformItems(
  tree: EagleUse.FolderTree[],
  onTitleClick: (key: string) => void
): ItemType[] {
  if (tree.length > 0) {
    return tree.map((item) => {
      const json: ItemType = {
        label: item.name,
        key: item.id,
        children: item.children ? foldersTreeTransformItems(item.children, onTitleClick) : [],
        onTitleClick: (info) => onTitleClick(info.key),
      };

      return json;
    });
  }

  return [];
}

export const getFolderItems = (tree: EagleUse.FolderTree[], onTitleClick: (key: string) => void) => {
  return {
    label: `文件夹`,
    key: "/folders",
    type: "group",
    children: foldersTreeTransformItems(tree, onTitleClick) || [],
  };
};
