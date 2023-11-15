/**
 * 静态服务器
 * 1. 主题
 * 2. libray 资源
 */

import path from "path";
import cors from "@fastify/cors";
import fastifyStatic from "@fastify/static";
import fastify from "fastify";

import type { Library } from "@rao-pics/db";

import { routerCore } from "../..";

let server: ReturnType<typeof fastify> | undefined;

export const startStaticServer = async () => {
  server = fastify({
    maxParamLength: 5000,
  });

  void server.register(cors, {
    origin: "*",
  });

  const config = await routerCore.config.findUnique();
  if (config) {
    void server.register((instance, opts, next) => {
      void instance.register(fastifyStatic, {
        root: path.join(
          process.resourcesPath,
          "extraResources",
          "themes",
          config.theme,
        ),
      });

      next();
    });
  }

  const libray = await routerCore.library.findUnique();
  if (libray) {
    void server.register((instance, opts, next) => {
      void instance.register(fastifyStatic, {
        root: path.join(libray.path, "images"),
        prefix: "/static",
      });

      next();
    });
  }

  await server.listen({ port: config?.clientPort });
  const res = server.server.address();

  server.log.info(
    `Static Server listening on ${typeof res === "string" ? res : res?.port}`,
  );
};

export const closeStaticServer = async () => {
  await server?.close();
  server = undefined;
};

export const restartStaticServer = async () => {
  await closeStaticServer();
  await startStaticServer();
};

export const updateStaticRoute = async (lib: Library | null) => {
  if (lib === null) return restartStaticServer();

  await closeStaticServer();

  await server?.register(import("@fastify/static"), {
    root: path.join(lib.path, "images"),
    prefix: "/static",
  });

  await startStaticServer();

  server?.log.info(`Static Route updated.`);
};
