import * as dotenv from "dotenv";
import watchImage from "./image";
import watchMetadata from "./metadata";
import { logger } from "@eagleuse/utils";
import { getNSFW } from "./image/nsfw";
import watchStarredTags from "./starred-tags";

export const transformEagle = async () => {
  dotenv.config();
  const { LIBRARY } = process.env;
  if (!LIBRARY) throw Error("LIBRARY is null!");

  logger.info("Start transform 🛫");

  await openPlugin();

  watchMetadata(LIBRARY);
  watchStarredTags(LIBRARY);
  watchImage(LIBRARY);
};

const getPluginApi = () => require("@eagleuse/plugin-api");
const openPlugin = async () => {
  const { PLUGIN_NSFW, PLUGIN_API } = process.env;

  if (PLUGIN_NSFW === "true") {
    await getNSFW();
    logger.info("Complete init nsfw.");
  }

  if (PLUGIN_API === "true") {
    getPluginApi()();
  }
};
