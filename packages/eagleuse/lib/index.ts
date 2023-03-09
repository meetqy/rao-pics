import PLUGIN_API from "@eagleuse/plugin-api";
import dotenv from "dotenv-flow";
import TransformEagle from "@eagleuse/transform-eagle";

const EagleUse = () => {
  const { LIBRARY, DATABASE_URL, NSFW = "false", PORT = 3002 } = process.env;

  if (!LIBRARY) throw Error("LIBRARY is null!");
  if (!DATABASE_URL) throw Error("DATABASE_URL is null!");

  dotenv.config();

  TransformEagle({
    library: LIBRARY,
    plugin_nsfw: NSFW === "true",
  });

  PLUGIN_API({
    library: LIBRARY,
    port: +PORT,
  });
};

export default EagleUse;
