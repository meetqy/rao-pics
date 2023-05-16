import { fastifyTRPCPlugin } from "@trpc/server/adapters/fastify";
import fastify from "fastify";

import { appRouter } from "./src/router";
import { createContext } from "./src/trpc";

const server = fastify({
  maxParamLength: 5000,
});

void server.register(fastifyTRPCPlugin, {
  prefix: "/api",
  trpcOptions: { router: appRouter, createContext },
});

export const startApiServer = async () => {
  try {
    await server.listen({ port: 45678 });
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};
