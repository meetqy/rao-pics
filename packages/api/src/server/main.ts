/**
 * 主要的 API 服务
 */

import cors from "@fastify/cors";
import ws from "@fastify/websocket";
import { fastifyTRPCPlugin } from "@trpc/server/adapters/fastify";
import fastify from "fastify";

import { router } from "../..";
import { createContext } from "../utils";

const server = fastify({
  maxParamLength: 5000,
});

void server.register(cors, {
  origin: "*",
});

void server.register(ws);

export const startMainServer = async () => {
  void server.register(fastifyTRPCPlugin, {
    prefix: "/trpc",
    useWSS: true,
    trpcOptions: { router, createContext },
  });

  await server.listen({ port: 61121 });
  const res = server.server.address();

  console.log(
    `TRPC API Server listening on ${typeof res === "string" ? res : res?.port}`,
  );
};

export const closeMainServer = () => server.close();
