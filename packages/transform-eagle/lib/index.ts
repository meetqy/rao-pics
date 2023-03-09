import watchImage from "./image";
import watchMetadata from "./metadata";
import { logger } from "@eagleuse/utils";
import { getNSFW } from "./image/nsfw";
import watchStarredTags from "./starred-tags";

interface Args {
  library: string;
  plugin_nsfw?: boolean;
}

const TransformEagle = async (args: Args) => {
  const { library, plugin_nsfw } = args;
  if (!library) throw Error("library is null!");

  process.env.LIBRARY = library;

  if (plugin_nsfw) {
    await getNSFW();
    logger.info("Complete init nsfw.");
  }

  logger.info("Start transform 🛫");

  await watchMetadata(library);
  await watchStarredTags(library);

  // 延迟一个 wait 时间
  setTimeout(() => {
    watchImage(library);
  }, 5000);
};

export default TransformEagle;
