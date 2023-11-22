/**
 * 静态服务器
 * 1. 主题
 * 2. libray 资源
 */

import path from "path";
import cors from "@fastify/cors";
import fastifyStatic from "@fastify/static";
import fastify from "fastify";

import { RLogger } from "@rao-pics/rlog";

import { routerCore } from "../..";

let server: ReturnType<typeof fastify> | undefined;

export const startClientServer = async () => {
  server = fastify({
    maxParamLength: 5000,
  });

  void server.register(cors, {
    origin: "*",
  });

  const config = await routerCore.config.findUnique();
  if (!config) return;

  server.get("/common/config", (_req, reply) => {
    return reply.send(config);
  });

  await server.register(fastifyStatic, {
    root: path.join(
      process.resourcesPath,
      "extraResources",
      "themes",
      config.theme,
    ),
    redirect: true,
  });

  const libray = await routerCore.library.findUnique();

  if (!libray) return;

  await server.register(fastifyStatic, {
    root: path.join(libray.path, "images"),
    prefix: "/static/",
    decorateReply: false,
  });

  await server.listen({ port: config.clientPort, host: "0.0.0.0" });

  RLogger.info(
    `client server listening on http://${config.ip}:${config.clientPort}`,
    "startClientServer",
  );
};

export const closeClientServer = async () => {
  await server?.close();
  server = undefined;
};

export const restartClientServer = async () => {
  await closeClientServer();
  await startClientServer();
};
