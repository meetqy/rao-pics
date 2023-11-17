/**
 * 主要的 API 服务
 */

import cors from "@fastify/cors";
import ws from "@fastify/websocket";
import { fastifyTRPCPlugin } from "@trpc/server/adapters/fastify";
import fastify from "fastify";

import { router, routerCore } from "../..";
import { createContext } from "../utils";

const server = fastify({
  maxParamLength: 5000,
});

void server.register(cors, {
  origin: "*",
});

void server.register(ws);

export const startMainServer = async () => {
  const config = await routerCore.config.findUnique();
  if (!config) return;

  server.get("/common/config", (_req, reply) => {
    return reply.send(config);
  });

  void server.register(fastifyTRPCPlugin, {
    prefix: "/trpc",
    useWSS: true,
    trpcOptions: { router, createContext },
  });

  await server.listen({ port: config.serverPort, host: "0.0.0.0" });
  const res = server.server.address();

  console.log(
    `TRPC API Server listening on ${typeof res === "string" ? res : res?.port}`,
  );
};

export const closeMainServer = () => server.close();
