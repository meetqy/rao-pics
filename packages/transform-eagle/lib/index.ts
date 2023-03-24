import watchImage from "./image";
import watchMetadata from "./metadata";
import { logger } from "@raopics/utils";
import { getNSFW } from "./image/nsfw";
import watchStarredTags from "./starred-tags";
import { getPrisma } from "@raopics/prisma-client";

interface Args {
  library: string;
  plugin_nsfw?: boolean;
}

const TransformEagle = async (args: Args) => {
  const { library, plugin_nsfw = false } = args;

  process.env.LIBRARY = library;
  process.env.PLUGIN_NSFW = String(plugin_nsfw);

  if (plugin_nsfw) {
    await getNSFW();
    logger.info("Init nsfw success.");
  }

  logger.info("Start transform 🛫");

  getPrisma(library);

  await watchMetadata(library);
  await watchStarredTags(library);

  // 延迟一个 wait 时间
  setTimeout(() => {
    watchImage(library);
  }, 5000);
};

export default TransformEagle;
