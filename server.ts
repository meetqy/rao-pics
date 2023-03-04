import fastifyNext from "@fastify/nextjs";
import PLUGIN_API from "@eagleuse/plugin-api";
import { join, resolve } from "path";
import dotenv from "dotenv";

async function main() {
  dotenv.config({
    debug: true,
    path: resolve(__dirname, `./.env.${process.env.NODE_ENV || "development"}`),
  });

  const host = process.env.NODE_ENV === "production" ? "localhost" : "0.0.0.0";

  await PLUGIN_API({
    library: join(process.env.LIBRARY, "./images"),
    port: +process.env.PORT || 3000,
    host,
    registerCallback: (fastify) => {
      fastify.register(fastifyNext).after(() => {
        console.log(13);
        fastify.next("/*");
      });
    },
  });
}

main();
