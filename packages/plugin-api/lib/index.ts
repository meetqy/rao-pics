import Fastify, { FastifyInstance } from "fastify";
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
import ip from "ip";

interface Args {
  library: string;
  port?: number;
  host?: string;
  registerCallback?: (fastify: FastifyInstance) => void;
}

const PLUGIN_API = async (args: Args) => {
  BigInt.prototype["toJSON"] = function () {
    return Number(this);
  };

  await createSymlink(args.library);

  const fastify = Fastify({
    trustProxy: true,
  });

  // 静态资源管理
  await fastify.register(fastifyStatic, {
    root: join(__dirname, "../public/library"),
    prefix: "/public/",
  });

  await fastify.register(cors, {});

  // api
  fastify.register(image, { prefix: "/api" });
  fastify.register(folder, { prefix: "/api" });
  fastify.register(tag, { prefix: "/api" });
  fastify.register(tagsGroups, { prefix: "/api" });

  // random image
  fastify.register(random);

  args.registerCallback && args.registerCallback(fastify);

  fastify.listen({ port: args.port, host: args.host }, function (err, address) {
    if (err) {
      logger.error(err);
      process.exit(1);
    }

    if (args.host === "0.0.0.0") {
      return logger.info(`Server is now listening on ${address.replace("0.0.0.0", ip.address())}`);
    }

    logger.info(`Server is now listening on ${address}`);
  });
};

export default PLUGIN_API;
