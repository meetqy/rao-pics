import { TransformBeforeArgs } from "@raopics/transform-eagle";
import { getPredictions } from "./core";

export const PLUGIN_NSFW = async function ({ metadata, database }: TransformBeforeArgs) {
  if (["jpg", "jpeg", "bmp", "png"].includes(metadata.ext)) {
    const { LIBRARY } = process.env;

    const predictions = await getPredictions(
      `${LIBRARY}/images/${metadata.id}.info/${metadata.name}.${metadata.ext}`
    );
    metadata.nsfw = true;
    metadata.tags = predictions.map((item) => item.className);
    return metadata;
  }

  return metadata;
};

export default PLUGIN_NSFW;
