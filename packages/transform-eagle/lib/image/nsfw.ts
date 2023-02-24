let _nsfw;

const getNSFW = () => {
  if (!_nsfw) {
    _nsfw = require("@eagleuse/plugin-nsfw");
  }

  return _nsfw;
};

/**
 * 获取 NSFW MetaData
 * @param metadata  文件读取的metadata
 * @param file      文件地址
 */
export const getNSFWMetadata = async (metadata: EagleUse.Image, file: string) => {
  if (process.env.PLUGIN_NSFW != "true") return metadata;

  const imageFile = file.replace("metadata.json", `${metadata.name}.${metadata.ext}`);
  const predictions = await getNSFW()(imageFile);
  predictions
    .filter((item) => item.probability > 0.35)
    .forEach((item) => metadata.tags.push(item.className as string));
  metadata.nsfw = true;

  return metadata;
};
