import { FastifyInstance } from "fastify";
import { handleInclude } from "../utils";
import { PrismaClient } from "@eagleuse/prisma-client";

export const id = async (fastify: FastifyInstance, prisma: PrismaClient) => {
  fastify.get<{
    Params: {
      id: string;
    };
    Querystring: {
      // keyof Prisma.ImageInclude
      // _count,tags,folders
      include?: string;
    };
  }>(
    "/image/:id",
    {
      preValidation: (req, reply, done) => {
        const { include } = req.query;
        let result = undefined;

        if (!/^((_count|tags|folders)(,?))+$/g.test(include) || include.endsWith(",")) {
          result = new Error(`Include is '_count,tags,folders'.`);
        }

        done(result);
      },
    },
    async (req) => {
      const { id } = req.params;
      const { include } = req.query;

      const result = await prisma.image.findUnique({
        where: { id },
        include: handleInclude(include),
      });

      return { result, include };
    }
  );
};
