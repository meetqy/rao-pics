import { TransformBeforeArgs } from "@raopics/transform-eagle";
import { getPredictions } from "./core";

const _NSFWTags = ["Drawing", "Hentai", "Neutral", "Porn", "Sexy"];

/**
 *
 * @param param0 TransformBeforeArgs
 * @param probability predictions[].probability > 阈值, 默认0.35
 * @returns
 */
export const PLUGIN_NSFW = async function ({ metadata, database }: TransformBeforeArgs, probability?: 0.35) {
  if (["jpg", "jpeg", "bmp", "png"].includes(metadata.ext)) {
    const { LIBRARY } = process.env;
    const { tags } = metadata;

    if (database) {
      // 【Core】EagleApp 中导入图片，已经存在，并勾选使用已存在的图片，NSFW检测结果会被覆盖。 #90
      // https://github.com/rao-pics/core/issues/90
      const oldNSFWTags = database.tags.filter((item) => _NSFWTags.includes(item.name));

      if (oldNSFWTags) {
        metadata.tags = tags.concat(oldNSFWTags.map((item) => item.name));
      }
    } else {
      const predictions = await getPredictions(
        `${LIBRARY}/images/${metadata.id}.info/${metadata.name}.${metadata.ext}`
      );

      const className = predictions
        .filter((item) => item.probability > probability)
        .map((item) => item.className);

      metadata.nsfw = true;
      metadata.tags = tags.concat(className);
    }

    return metadata;
  }

  return metadata;
};

export default PLUGIN_NSFW;
