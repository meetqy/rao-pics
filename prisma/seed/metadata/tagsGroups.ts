import { PrismaClient } from "@prisma/client";

const TagGroup = {
  add: (prisma: PrismaClient, json: { [key in string]: any }) => {
    const { tagsGroups } = json;

    tagsGroups.map((tagsGroup) => {
      const result = {
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
    const { tagsGroups } = json;

    tagsGroups.map((tagsGroup) => {
      const result = {
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
};

export default TagGroup;
