import { prisma, type Library, type Prisma } from "@acme/db";

import { type EagleEmit } from ".";
import { type TagsGroup } from "./types";

export const handleTagsGroup = async (tagsGroups: TagsGroup[], library: Library, emit?: EagleEmit) => {
  for (const [index, group] of tagsGroups.entries()) {
    const input: Prisma.TagsGroupCreateInput = {
      ...group,
      library: { connect: { id: library.id } },
      tags: JSON.stringify(group.tags),
    };

    await prisma.tagsGroup.upsert({
      where: { id: group.id },
      create: input,
      update: input,
    });

    emit &&
      emit({
        type: "tagsGroup",
        current: index + 1,
        count: tagsGroups.length,
      });
  }

  // 清除已经删除，sqlite中还存在的TagsGroup。
  await prisma.tagsGroup.deleteMany({
    where: {
      AND: [
        {
          id: {
            notIn: tagsGroups.map((group) => group.id),
          },
        },
        { libraryId: library.id },
      ],
    },
  });
};
