import watchImage, { Transform as _Transfrom } from "./image";
import watchMetadata from "./metadata";
import { logger } from "@raopics/utils";
import watchStarredTags from "./starred-tags";
import { getPrisma } from "@raopics/prisma-client";

export * from "./types";
export type Transform = _Transfrom;

export interface Args {
  library: string;
  transform: _Transfrom;
}

const TransformEagle = async (args: Args) => {
  const { library, transform } = args;

  process.env.LIBRARY = library;

  logger.info("Start transform 🛫");

  getPrisma(library);

  await watchMetadata(library);
  await watchStarredTags(library);

  // 延迟一个 wait 时间
  setTimeout(() => {
    watchImage(library, transform);
  }, 3000);
};

export default TransformEagle;
