import { PrismaClient } from "@prisma/client";

const TagGroup = {
  add: (prisma: PrismaClient, json: { [key in string]: any }) => {
    const { tagsGroups } = json;
    tagsGroups.map((tagsGroup) => {
      prisma.tagsGroups
        .upsert({
          where: {
            id: tagsGroup["id"],
          },
          create: {
            id: tagsGroup["id"],
            name: tagsGroup["name"],
            color: tagsGroup["color"],
          },
          update: {
            id: tagsGroup["id"],
            name: tagsGroup["name"],
            color: tagsGroup["color"],
          },
        })
        .then((res) => {
          console.log("init tagsGroups with id: " + res.id);
        });

      prisma.tag
        .updateMany({
          where: {
            id: {
              in: tagsGroup["tags"],
            },
          },
          data: {
            tagsGroupsId: tagsGroup["id"],
          },
        })
        .then((res) => {
          console.log("init tags with count: " + res.count);
        });
    });
  },

  change: (prisma: PrismaClient, json: { [key in string]: any }) => {
    const { tagsGroups } = json;
    tagsGroups.map((tagsGroup) => {
      prisma.tagsGroups
        .upsert({
          where: {
            id: tagsGroup["id"],
          },
          create: {
            id: tagsGroup["id"],
            name: tagsGroup["name"],
            color: tagsGroup["color"],
          },
          update: {
            id: tagsGroup["id"],
            name: tagsGroup["name"],
            color: tagsGroup["color"],
          },
        })
        .then((res) => {
          console.log("init tagsGroups with id: " + res.id);
        });

      prisma.tag
        .updateMany({
          where: {
            id: {
              in: tagsGroup["tags"],
            },
          },
          data: {
            tagsGroupsId: tagsGroup["id"],
          },
        })
        .then((res) => {
          console.log("init tags with count: " + res.count);
        });
    });
  },
};

export default TagGroup;
