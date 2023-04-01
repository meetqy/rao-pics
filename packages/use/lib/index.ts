import PLUGIN_API from "@raopics/plugin-api";
import TransformEagle, { Transform } from "@raopics/transform-eagle";

interface Options {
  // library 地址
  library: string;
  // 开启转换 eagle,默认 true
  transform_eagle?: boolean;
  // 转换
  transform?: Transform;
  // 端口号
  port?: number;
}

const raopics = (options?: Options) => {
  const { transform_eagle = true, port = 0, transform } = options || {};

  if (transform_eagle) {
    TransformEagle({
      library: options.library,
      transform,
    });
  }

  PLUGIN_API({
    library: options.library,
    port,
  });
};

export default raopics;
