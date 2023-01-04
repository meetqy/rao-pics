import _ from "lodash";

// folder 转换为 tree 结构
export const transformFolderToTree = (folders: EagleUse.Folder[]) => {
  const _folders = _.cloneDeep(folders);
  const keyBy = _.keyBy(_folders, "id");
  _.each(
    _.omit(_.groupBy(_folders, "pid"), null),
    function (children, parentId) {
      keyBy[parentId].children = children;
    }
  );

  return _.filter(keyBy, (item) => !item.pid);
};
