import { FastifyInstance } from "fastify";
import { getPrisma } from "@eagleuse/prisma-client";
import { _ } from "./_";

const tag = async (fastify: FastifyInstance) => {
  const prisma = getPrisma();

  _(fastify, prisma);
};

export default tag;
