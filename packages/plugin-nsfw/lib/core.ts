import * as tf from "@tensorflow/tfjs-node";
import * as nsfwjs from "nsfwjs";
import fs from "fs-extra";

const host = "https://rao.ujump.cn/nsfw_model";

let model;

export type modelType = "model" | "quant_mid" | "quant_nsfw_mobilenet";
export type options = {
  size: number;
  type?: string;
};

export const getPredictions = async (file: string, modelType: modelType, options: options) => {
  if (!model) {
    model = await nsfwjs.load(host + `/${modelType}/`, options);
  }

  const pic = new Uint8Array(fs.readFileSync(file).buffer);
  const image = await tf.node.decodeImage(pic, 3);
  const predictions = await model.classify(image as never);
  image.dispose();

  return predictions;
};
