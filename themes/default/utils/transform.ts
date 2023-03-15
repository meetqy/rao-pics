import _ from "lodash";

// folder 转换为 tree 结构
export const transformFolderToTree = (folders: EagleUse.FolderTree[]) => {
  const _folders = _.cloneDeep(folders);
  const keyBy = _.keyBy(_folders, "id");
  _.each(_.omit(_.groupBy(_folders, "pid"), "null"), function (children, parentId) {
    keyBy[parentId].children = children;
  });

  return _.filter(keyBy, (item) => !item.pid);
};

// 字节转其他单位 MB GB
export const transformByteToUnit = (bytes = 0, decimals = 2) => {
  if (!+bytes) return "0 Bytes";

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
};
