import fastifyStatic from "@fastify/static";
import Fastify from "fastify";

const fastify = Fastify({
  logger: true,
});

export const addAssets = (lib: string) => {
  void fastify.register(fastifyStatic, {
    root: lib,
  });
};

fastify.listen({ port: 9621 }, (err) => {
  if (err) throw err;
});
