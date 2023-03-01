import Fastify from "fastify";
import image from "./image";

const PLUGIN_API = () => {
  BigInt.prototype["toJSON"] = function () {
    return Number(this);
  };

  const fastify = Fastify({
    logger: true,
  });

  fastify.register(image);

  fastify.listen({ port: +process.env.PORT || 3000 }, function (err, address) {
    if (err) {
      fastify.log.error(err);
      process.exit(1);
    }

    fastify.log.info(`Server is now listening on ${address}`);
  });
};

export default PLUGIN_API;
