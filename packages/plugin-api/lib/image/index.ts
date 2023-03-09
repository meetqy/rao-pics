import { FastifyInstance } from "fastify";
import { id } from "./[id]";
import { _ } from "./_";

const image = async (fastify: FastifyInstance) => {
  id(fastify);
  _(fastify);
};

export default image;
