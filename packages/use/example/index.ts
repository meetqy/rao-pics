import raopics from "../lib";
import PLUGIN_NSFW from "@raopics/plugin-nsfw";
import * as dotenv from "dotenv";

dotenv.config();

const { LIBRARY } = process.env;

raopics({
  library: LIBRARY,
  // library: "/Users/qymeet/MEGAsync/rao.library",
  // library: "/Users/qymeet/Pictures/test.library",
  transform: {
    before: async (args) => {
      const metadata = await PLUGIN_NSFW(args, {
        probability: 0.1,
        model: "model",
        modelOptions: { size: 299 },
      });
      return metadata;
    },
  },
});
