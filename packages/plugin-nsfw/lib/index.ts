import * as tf from "@tensorflow/tfjs-node";
import * as nsfw from "nsfwjs";
import fs from "fs-extra";
import { join } from "path";
import { TransformBeforeArgs } from "@raopics/transform-eagle";

let model: nsfw.NSFWJS;

const getModel = async () => {
  const file = join(__dirname, "../nsfw_model/model/");
  if (!model) {
    model = await nsfw.load(file, { size: 299 });
  }

  return model;
};

/**
 * 检测图片 NSFW
 * @param file  图片路径
 */
const getPredictions = async (file: string) => {
  if (process.env.NSFW === "false") return [];

  const pic = new Uint8Array(fs.readFileSync(file).buffer);
  const model = await getModel();
  const image = await tf.node.decodeImage(pic, 3);

  const predictions = await model.classify(image as never);
  image.dispose();

  return predictions;
};

export const PLUGIN_NSFW = async ({ metadata, database }: TransformBeforeArgs) => {
  const pe = await getPredictions("/Users/qymeet/Pictures/test.library/images/LEMJ79G1S9EJN.info/bbb.jpg");
  console.log(pe);
  // if (["jpg", "jpeg", "bmp", "png"].includes(metadata.ext)) {
  //   const { LIBRARY } = process.env;

  //   const file = `${LIBRARY}/images/${metadata.id}.info/${metadata.name}.${metadata.ext}`;
  //   console.log(file);
  //   const predictions = await getPredictions(file);
  //   metadata.nsfw = true;
  //   metadata.tags = predictions.map((item) => item.className);
  //   return metadata;
  // }

  return metadata;
};

export default PLUGIN_NSFW;
