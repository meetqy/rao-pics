import { FastifyInstance } from "fastify";
import { _ } from "./_";

const tag = async (fastify: FastifyInstance) => {
  _(fastify);
};

export default tag;
