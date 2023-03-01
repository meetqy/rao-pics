import { FastifyInstance } from "fastify";
import { getPrisma } from "@eagleuse/prisma-client";
import { id } from "./[id]";
import { _ } from "./_";

const image = async (fastify: FastifyInstance) => {
  const prisma = getPrisma();

  id(fastify, prisma);
  _(fastify, prisma);
};

export default image;
