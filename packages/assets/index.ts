import fastifyStatic from "@fastify/static";
import Fastify from "fastify";

const fastify = Fastify({
  logger: true,
});

export const addAssets = (lib: string) => {
  console.log("-----------", lib);
  void fastify.register(fastifyStatic, {
    root: " /Users/qymeet/MEGAsync/r.library/images",
  });

  fastify.listen({ port: 9621 }, (err, address) => {
    if (err) {
      console.log(err, "-------- fastify error");
      throw err;
    }

    console.log("Assets server listening on port 9621, address: ", address);
  });
};
