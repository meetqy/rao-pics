import { prisma, type Library, type Prisma } from "@acme/db";

import { type TagsGroup } from "./types";

export const handleTagsGroups = async (tagsGroups: TagsGroup[], library: Library) => {
  for (const group of tagsGroups) {
    const input: Prisma.TagsGroupsCreateInput = {
      ...group,
      library: { connect: { id: library.id } },
      tags: JSON.stringify(group.tags),
    };

    await prisma.tagsGroups.upsert({
      where: { id: group.id },
      create: input,
      update: input,
    });
  }

  await prisma.tagsGroups.deleteMany({
    where: {
      id: {
        notIn: tagsGroups.map((group) => group.id),
      },
    },
  });
};
