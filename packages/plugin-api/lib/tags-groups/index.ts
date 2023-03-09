import { FastifyInstance } from "fastify";
import { Prisma, getPrisma } from "@eagleuse/prisma-client";

const tagsGroups = async (fastify: FastifyInstance) => {
  fastify.post<{
    Body: Prisma.TagsGroupsFindManyArgs;
  }>("/tags-groups", async (req) => {
    const prisma = getPrisma();
    const [count, data] = await prisma.$transaction([
      prisma.tagsGroups.count({
        where: req.body.where,
      }),
      prisma.tagsGroups.findMany(req.body),
    ]);

    return {
      count,
      data,
    };
  });
};

export default tagsGroups;
