import { Prisma, PrismaClient } from "@eagleuse/prisma-client";
import { FastifyInstance } from "fastify";

export const _ = async (fastify: FastifyInstance, prisma: PrismaClient) => {
  fastify.post<{
    Body: {
      where?: Prisma.TagWhereInput;
      include?: Prisma.TagInclude;
    };
  }>("/tag", async (req) => {
    const { where, include } = req.body;
    const json: Prisma.TagFindManyArgs = {};

    if (where) json.where = where;
    if (include) json.include = include;

    const [count, data] = await prisma.$transaction([
      prisma.tag.count({ where: json.where }),
      prisma.tag.findMany(json),
    ]);

    return {
      count,
      data,
    };
  });
};
