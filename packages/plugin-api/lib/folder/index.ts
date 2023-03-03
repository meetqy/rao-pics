import { FastifyInstance } from "fastify";
import { getPrisma } from "@eagleuse/prisma-client";
import { _ } from "./_";

const folder = async (fastify: FastifyInstance) => {
  const prisma = getPrisma();

  _(fastify, prisma);
};

export default folder;
