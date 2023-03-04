import Fastify from "fastify";
import fastifyStatic from "@fastify/static";
import image from "./image";
import { createSymlink } from "./script";
import { join } from "path";
import cors from "@fastify/cors";
import { random } from "./random";
import folder from "./folder";
import tag from "./tag";
import tagsGroups from "./tags-groups";
import { logger } from "@eagleuse/utils";
import dotenv from "dotenv";

interface Args {
  library: string;
  fastify?;
  port?: number;
}

const PLUGIN_API = async (args: Args) => {
  dotenv.config();

  BigInt.prototype["toJSON"] = function () {
    return Number(this);
  };

  await createSymlink(args.library);

  const _fatify =
    args.fastify ||
    Fastify({
      trustProxy: true,
    });

  // 静态资源管理
  await _fatify.register(fastifyStatic, {
    root: join(__dirname, "../public/library"),
    prefix: "/public/",
  });

  await _fatify.register(cors, {});

  // api
  _fatify.register(image, { prefix: "/api" });
  _fatify.register(folder, { prefix: "/api" });
  _fatify.register(tag, { prefix: "/api" });
  _fatify.register(tagsGroups, { prefix: "/api" });

  // random image
  _fatify.register(random);

  if (args.port) {
    _fatify.listen({ port: args.port, host: "0.0.0.0" }, function (err, address) {
      if (err) {
        _fatify.log.error(err);
        process.exit(1);
      }

      logger.info(`Server is now listening on ${address}`);
    });
  }
};

export default PLUGIN_API;
