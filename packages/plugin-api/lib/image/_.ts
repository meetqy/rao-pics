import { FastifyInstance } from "fastify";
import { Prisma, PrismaClient } from "@eagleuse/prisma-client";

export const _ = async (fastify: FastifyInstance, prisma: PrismaClient) => {
  fastify.post<{
    Querystring: {
      page?: number;
      pageSize?: number;
    };
    Body: {
      orderBy?: Prisma.Enumerable<Prisma.ImageOrderByWithRelationInput>;
      include?: Prisma.ImageInclude;
      where?: Prisma.ImageWhereInput;
    };
  }>("/image", async (req) => {
    const { orderBy, include, where } = req.body || {};
    const page = +req.query.page || 1;
    const pageSize = +req.query.pageSize || 20;

    const json: Prisma.ImageFindManyArgs = {
      skip: (page - 1) * pageSize,
      take: pageSize,
    };
    if (orderBy) json.orderBy = orderBy;
    if (include) json.include = include;
    if (where) json.where = where;

    const [data, count, sum] = await prisma.$transaction([
      prisma.image.findMany(json),
      prisma.image.count({
        where: json.where,
      }),
      prisma.image.aggregate({
        where: json.where,
        _sum: {
          size: true,
        },
      }),
    ]);

    return { data, count, ...sum._sum, args: json, page, pageSize };
  });
};
