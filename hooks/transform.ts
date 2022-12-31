import _ from "lodash";

// folder 转换为 tree 结构
export const transformFolderToTree = (folders: EagleUse.Folder[]) => {
  const keyBy = _.keyBy(folders, "id");
  _.each(
    _.omit(_.groupBy(folders, "pid"), null),
    function (children, parentId) {
      keyBy[parentId].children = children;
    }
  );

  return _.filter(keyBy, (item) => !item.pid);
};
