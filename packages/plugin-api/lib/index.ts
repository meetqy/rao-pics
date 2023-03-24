import Fastify, { FastifyInstance } from "fastify";
import fastifyStatic from "@fastify/static";
import image from "./image";
import cors from "@fastify/cors";
import { random } from "./random";
import folder from "./folder";
import tag from "./tag";
import tagsGroups from "./tags-groups";
import { logger } from "@raopics/utils";
import ip from "ip";
import { getPrisma } from "@raopics/prisma-client";

interface Args {
  library: string;
  port?: number;
  registerCallback?: (fastify: FastifyInstance) => void;
}

const PLUGIN_API = async (args: Args) => {
  BigInt.prototype["toJSON"] = function () {
    return Number(this);
  };

  const fastify = Fastify({
    trustProxy: true,
  });

  args.registerCallback && args.registerCallback(fastify);

  getPrisma(args.library);

  // 静态资源管理
  await fastify.register(fastifyStatic, {
    root: args.library + "/images",
    prefix: "/static/",
  });

  await fastify.register(cors, {});

  // api
  fastify.register(image, { prefix: "/api" });
  fastify.register(folder, { prefix: "/api" });
  fastify.register(tag, { prefix: "/api" });
  fastify.register(tagsGroups, { prefix: "/api" });

  // random image
  fastify.register(random);
  fastify.register(random, { prefix: "/api" });

  const port = args.port || 9600;

  fastify.listen({ port, host: "0.0.0.0" }, function (err) {
    if (err) {
      logger.error(err);
      process.exit(1);
    }

    logger.info(
      `[plugin-api] Server is now listening on \n - http://${ip.address()}:${port}\n - http://localhost:${port}`
    );
  });
};

export default PLUGIN_API;
