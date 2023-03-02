import { logger } from "@eagleuse/utils";
import { getPrisma } from "@eagleuse/prisma-client";
import { trigger } from "../trigger";

const prisma = getPrisma();

export const handleTagsGroups = (localTagsGroups: EagleUse.TagsGroupsItem[]) => {
  localTagsGroups.forEach((item) => {
    const tags = (item.tags as string[]) || [];

    const data = {
      ...item,
      tags: {
        connectOrCreate: tags.map((tag) => ({
          where: { id: tag },
          create: { id: tag, name: tag },
        })),
      },
    };

    prisma.tagsGroups
      .upsert({
        where: { id: item.id },
        create: data,
        update: data,
      })
      .catch((e) => logger.info(e, "TagsGroups error: "));

    trigger();
  });

  deleteUnnecessary(localTagsGroups);
};

const deleteUnnecessary = (localTagsGroup: EagleUse.TagsGroupsItem[]) => {
  prisma.tagsGroups
    .findMany({
      where: {
        id: {
          notIn: localTagsGroup.map((item) => item.id),
        },
      },
    })
    .then((tagsGroups) => {
      if (tagsGroups && tagsGroups.length > 0) {
        prisma.tagsGroups
          .deleteMany({
            where: {
              id: {
                in: tagsGroups.map((item) => item.id),
              },
            },
          })
          .catch((e) => {
            logger.error(e, "TagsGroups Delete error: ");
          });
      }
    });
  trigger();
};
