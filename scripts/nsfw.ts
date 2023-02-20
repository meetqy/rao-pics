import * as tf from "@tensorflow/tfjs-node";
import * as nsfw from "nsfwjs";
import fs from "fs-extra";
import { join } from "path";

let model: nsfw.NSFWJS;

const getModel = async () => {
  const file = join(__dirname, "./nsfw_model/model/");
  if (!model) {
    model = await nsfw.load(`file://${file}`, { size: 299 });
  }

  return model;
};

getModel();

// 获取 nsfw tag
const getNSFWTag = async (file: string): Promise<string[]> => {
  if (process.env.NSFW === "false") return [];

  const pic = new Uint8Array(fs.readFileSync(file).buffer);
  const model = await getModel();
  const image = await tf.node.decodeImage(pic, 3);
  const predictions = await model.classify(image as tf.Tensor3D);
  image.dispose();

  return predictions
    .filter((item) => item.probability > 0.35)
    .map((item) => item.className);
};

export default getNSFWTag;
