import { FastifyInstance } from "fastify";
import { handleInclude } from "../utils";
import { PrismaClient } from "@eagleuse/prisma-client";

export const _ = async (fastify: FastifyInstance, prisma: PrismaClient) => {
  fastify.post<{
    Querystring: {
      // keyof Prisma.ImageInclude
      // _count,tags,folders
      include?: string;
    };
  }>(
    "/image",
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
      const { include } = req.query;

      const result = await prisma.image.findUnique({
        where: {},
        include: handleInclude(include),
      });

      return { result, include };
    }
  );
};
