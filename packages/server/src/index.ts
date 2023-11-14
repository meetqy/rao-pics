import cors from "@fastify/cors";
import ws from "@fastify/websocket";
import { fastifyTRPCPlugin } from "@trpc/server/adapters/fastify";
import fastify from "fastify";

import { router } from "@rao-pics/api";

import { createContext } from "./context";

const server = fastify({
  maxParamLength: 5000,
});

void server.register(cors, {
  origin: "*",
});
void server.register(ws);
void server.register(fastifyTRPCPlugin, {
  prefix: "/trpc",
  useWSS: true,
  trpcOptions: { router, createContext },
});

export const startServer = async () => {
  try {
    await server.listen({ port: 61121 });
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};
