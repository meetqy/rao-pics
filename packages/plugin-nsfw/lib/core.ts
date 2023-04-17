import * as tf from "@tensorflow/tfjs-node";
import fs from "fs-extra";
import { join, resolve } from "path";
import { NSFWJS } from "nsfwjs";
// import { logger } from "@raopics/utils";

let isLoad = false;

const baseUrl = join(__dirname, "../nsfw_model/quant_mid/");
const nsfwIns = new NSFWJS(baseUrl, {
  size: 224,
  type: "graph",
});

overideLoad(nsfwIns, baseUrl);

function overideLoad(context: NSFWJS, modelBaseUrl: string) {
  context.load = async function nsfwnetOverideLoad() {
    const { size, type } = this.options;
    /**
     * @type String xxx/model.json
     */
    const pathOrIOHandler = this.pathOrIOHandler;
    const loadOptions = {
      // onProgress: (fraction: number) => {
      //   {
      //     logger.info(`ModelLoad onProgress:${(fraction * 100).toFixed(1)}%`);
      //   }
      // },
      fetchFunc(fpath: string) {
        let curPath = fpath;
        //ForWindows
        if (!fs.existsSync(curPath)) {
          curPath = resolve(modelBaseUrl, "./" + fpath);
        }

        return import("node-fetch").then(({ Response: fetchResponse }) => {
          return new Promise((resolve, reject) => {
            fs.readFile(curPath, (err, data) => {
              if (err) {
                reject(err);
                return;
              }
              resolve(
                new fetchResponse(data, {
                  //   headers:{'Content-Type':
                  // }
                })
              );
            });
          });
        });
      },
    };
    if (type === "graph") {
      this.model = await tf.loadGraphModel(pathOrIOHandler, loadOptions);
    } else {
      // this is a Layers Model
      this.model = await tf.loadLayersModel(pathOrIOHandler, loadOptions);
      this.endpoints = this.model.layers.map((l) => l.name);
    }

    // Warmup the model.
    const result = tf.tidy(() => this.model.predict(tf.zeros([1, size, size, 3]))) as tf.Tensor;
    await result.data();
    result.dispose();
  };
}

export const getPredictions = async (file: string) => {
  if (!isLoad) {
    await nsfwIns.load();
    isLoad = true;
  }

  if (process.env.NSFW === "false") return [];

  const pic = new Uint8Array(fs.readFileSync(file).buffer);
  const image = await tf.node.decodeImage(pic, 3);
  const predictions = await nsfwIns.classify(image as never);
  image.dispose();

  return predictions;
};
