import watchImage from "./image";
import watchMetadata from "./metadata";
import { logger } from "@raopics/utils";
import watchStarredTags from "./starred-tags";
import { getPrisma } from "@raopics/prisma-client";
import { Transform } from "./types";

export * from "./types";

export interface Args {
  library: string;
  transform?: Transform;
}

const TransformEagle = async (args: Args) => {
  const { library, transform } = args;

  process.env.LIBRARY = library;

  logger.info("[transform-eagle] Start transform 🛫");

  getPrisma(library);

  watchMetadata(library, () => {
    // 先初始化标签和文件夹
    watchImage(library, transform);
  });
  watchStarredTags(library);
};

export default TransformEagle;
