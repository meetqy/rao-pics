import PLUGIN_API from "@eagleuse/plugin-api";
import dotenv from "dotenv-flow";
import TransformEagle from "@eagleuse/transform-eagle";

interface Args {
  // 开启转换 eagle,默认 true
  transform_eagle: boolean;
  // 开启sqlite api访问, 默认 true
  plugin_api: boolean;
}

const EagleUse = (args: Args) => {
  const { LIBRARY, DATABASE_URL, NSFW = "false", PORT = 3002 } = process.env;
  const { transform_eagle = true, plugin_api = true } = args;

  if (!LIBRARY) throw Error("LIBRARY is null!");
  if (!DATABASE_URL) throw Error("DATABASE_URL is null!");

  dotenv.config();

  if (transform_eagle) {
    TransformEagle({
      library: LIBRARY,
      plugin_nsfw: NSFW === "true",
    });
  }

  if (plugin_api) {
    PLUGIN_API({
      library: LIBRARY,
      port: +PORT,
    });
  }
};

export default EagleUse;
