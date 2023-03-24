import PLUGIN_API from "@raopics/plugin-api";
import TransformEagle from "@raopics/transform-eagle";
import dotenv from "dotenv-flow";
import { join } from "path";

interface Options {
  // library 地址
  library: string;
  // 开启转换 eagle,默认 true
  transform_eagle?: boolean;
  // 开启sqlite api访问, 默认 true
  plugin_api?: boolean;
  // nsfw 检测
  plugin_nsfw?: boolean;
  // 端口号
  port?: number;
}

const raopics = (options?: Options) => {
  dotenv.config({
    debug: true,
    path: join(__dirname, "../"),
  });

  const { transform_eagle = true, plugin_api = true, plugin_nsfw = true, port = 0 } = options || {};

  if (transform_eagle) {
    TransformEagle({
      library: options.library,
      plugin_nsfw,
    });
  }

  if (plugin_api) {
    PLUGIN_API({
      library: options.library,
      port,
    });
  }
};

export default raopics;
