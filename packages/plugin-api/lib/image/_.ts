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
    const { orderBy, include, where } = req.body;
    const { page = 1, pageSize = 20 } = req.query;

    const [result, count, sum] = await prisma.$transaction([
      prisma.image.findMany({
        where,
        include,
        orderBy,
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
      prisma.image.count({
        where,
      }),
      prisma.image.aggregate({
        where,
        _sum: {
          size: true,
        },
      }),
    ]);

    return { result, count, ...sum._sum, include, where };
  });
};
