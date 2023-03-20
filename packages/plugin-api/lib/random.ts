import { getPrisma } from "@raopics/prisma-client";
import { FastifyInstance } from "fastify";

export const random = async (fastify: FastifyInstance) => {
  const prisma = getPrisma();

  const callback = async (_req, res) => {
    const count = await prisma.image.count();
    const skip = Math.floor(Math.random() * count);

    const image = await prisma.image.findFirst({
      skip,
    });

    const prefix = `/static/${image.id}.info/${image.name}`;

    if (image.noThumbnail) {
      return res.redirect(`${prefix}.${image.ext}`);
    }

    return res.redirect(`${prefix}_thumbnail.png`);
  };

  fastify.get("/random", callback);
  fastify.get("/r", callback);
};
