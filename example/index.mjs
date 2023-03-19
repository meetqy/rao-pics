import EagleUse from "@raopics/eagleuse";

EagleUse({
  // 开启API访问
  plugin_api: true,
  // 开启创建Sqlite时，自动NSFW检测图片并打标签
  plugin_nsfw: true,
  // 开启转换
  transform_eagle: true,
  // api访问端口号
  port: 4002,
});
