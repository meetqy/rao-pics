import raopics from "../lib";
import PLUGIN_NSFW from "@raopics/plugin-nsfw";

raopics({
  library: "/Users/qymeet/Pictures/test.library",
  transform: {
    before: async (args) => {
      const metadata = await PLUGIN_NSFW(args);
      return metadata;
    },
  },
});
