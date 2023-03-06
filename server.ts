import fastifyNext from "@fastify/nextjs";
import PLUGIN_API from "@eagleuse/plugin-api";
import { join } from "path";
import dotenv from "dotenv-flow";

async function main() {
  dotenv.config({
    debug: true,
    node_env: process.env.NODE_ENV || "development",
  });

  await PLUGIN_API({
    library: join(process.env.LIBRARY, "./images"),
    port: +process.env.PORT || 3000,
    registerCallback: (fastify) => {
      fastify.register(fastifyNext).after(() => {
        fastify.next("/*");
      });
    },
  });
}

main();
