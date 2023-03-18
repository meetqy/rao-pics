import PLUGIN_API from "@eagleuse/plugin-api";
import dotenv from "dotenv-flow";
import TransformEagle from "@eagleuse/transform-eagle";

interface Options {
  // 开启转换 eagle,默认 true
  transform_eagle?: boolean;
  // 开启sqlite api访问, 默认 true
  plugin_api?: boolean;
  // nsfw 检测
  plugin_nsfw?: boolean;
  // 端口号
  port?: number;
}

const EagleUse = (options?: Options) => {
  const { DATABASE_URL } = process.env;
  const { transform_eagle = true, plugin_api = true, plugin_nsfw = true, port = 3002 } = options || {};

  if (!DATABASE_URL) throw Error("DATABASE_URL is null!");

  const file = DATABASE_URL.match(/:.*?(\/eagleuse\.db)/g);
  let library;
  if (file) {
    library = file[0].replace(/(:|\/eagleuse\.db)/g, "");
  }

  if (!library) throw Error("DATABASE_URL error!");

  dotenv.config();

  if (transform_eagle) {
    TransformEagle({
      library,
      plugin_nsfw,
    });
  }

  if (plugin_api) {
    PLUGIN_API({
      library,
      port,
    });
  }
};

export default EagleUse;
