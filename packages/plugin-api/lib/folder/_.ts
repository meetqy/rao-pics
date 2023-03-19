import { getPrisma } from "@raopics/prisma-client";
import { FastifyInstance } from "fastify";

export const _ = async (fastify: FastifyInstance) => {
  fastify.get("/folder", async () => {
    const prisma = getPrisma();
    const [count, data] = await prisma.$transaction([
      prisma.folder.count(),
      prisma.folder.findMany({
        include: {
          _count: {
            select: {
              images: true,
            },
          },
          images: {
            take: 1,
          },
        },
      }),
    ]);

    return {
      count,
      data,
    };
  });
};
