import { PrismaClient } from "@prisma/client";
import _ from "lodash";

// tagGroup 缓存
// 1.add 文件监听中会加入到lastTagsGroupsCache
// 2.change 更新lastTagsGroupsCache
// 如果删除了，进行比对
// 删除sqlite中的数据
let lastTagsGroupsCache = [];

const handleTagGroupItem = (tagsGroup) => {
  return {
    id: tagsGroup["id"],
    name: tagsGroup["name"],
    color: tagsGroup["color"],
    tags: {
      connectOrCreate: tagsGroup["tags"].map((tag) => ({
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

const TagGroup = {
  add: (prisma: PrismaClient, json: { [key in string]: any }) => {
    lastTagsGroupsCache = json["tagsGroups"];
    if (!lastTagsGroupsCache) return;

    lastTagsGroupsCache.map((tagsGroup) => {
      const result = handleTagGroupItem(tagsGroup);

      prisma.tagsGroups
        .upsert({
          where: {
            id: tagsGroup.id,
          },
          create: result,
          update: result,
        })
        .then((res) => {
          console.log("connect or init tagsGroups with id: " + res.id);
        });
    });
  },

  change: (prisma: PrismaClient, json: { [key in string]: any }) => {
    // 判断tagsGroup 是否改变
    // 判断tagsGroup => tags 是否改变

    const { tagsGroups } = json;
    const _lastTagsGroupsCache = _.cloneDeep(lastTagsGroupsCache);

    // 当次操作的状态 >0 新增, <0 删除, =0 修改
    const optStatus = tagsGroups.length - _lastTagsGroupsCache.length;
    let diffTagsGroups = [];

    if (optStatus > 0) {
      diffTagsGroups = _.differenceWith(
        tagsGroups,
        lastTagsGroupsCache,
        _.isEqual
      );
    } else if (optStatus < 0) {
      diffTagsGroups = _.differenceWith(
        lastTagsGroupsCache,
        tagsGroups,
        _.isEqual
      );
    } else {
      diffTagsGroups = _.differenceWith(
        tagsGroups,
        lastTagsGroupsCache,
        _.isEqual
      );
    }

    lastTagsGroupsCache = tagsGroups;

    diffTagsGroups.map((tagsGroup) => {
      const result = handleTagGroupItem(tagsGroup);

      if (optStatus > 0) {
        prisma.tagsGroups
          .upsert({
            where: {
              id: result.id,
            },
            create: result,
            update: result,
          })
          .then((folder) => {
            console.log("upsert folder with id: ", folder.id);
          });
      } else if (optStatus < 0) {
        prisma.tagsGroups
          .delete({
            where: {
              id: result.id,
            },
          })
          .then((folder) => {
            console.log("delete folder with id: ", folder.id);
          });
      } else {
        const oldTagsGroup = _lastTagsGroupsCache.find(
          (item) => item.id === tagsGroup.id
        );

        const status = tagsGroup.tags.length - oldTagsGroup.tags.length;

        if (status >= 0) {
          prisma.tagsGroups
            .update({
              where: {
                id: result.id,
              },
              data: result,
            })
            .then((folder) => {
              console.log("update folder with id: ", folder.id);
            });
        } else {
          // 取消关联 tags
          const deleteTags: string[] = _.difference(
            oldTagsGroup.tags,
            tagsGroup.tags
          );

          prisma.tagsGroups
            .update({
              where: {
                id: result.id,
              },
              data: {
                id: tagsGroup["id"],
                name: tagsGroup["name"],
                color: tagsGroup["color"],
                tags: {
                  disconnect: deleteTags.map((tag) => ({
                    id: tag,
                  })),
                },
              },
            })
            .then((folder) => {
              console.log(
                "disconnect folder/tags with id: ",
                folder.id,
                deleteTags
              );
            });
        }
      }
    });
  },
};

export default TagGroup;
