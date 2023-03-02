import PLUGIN_API from "@eagleuse/plugin-api";
import { transformEagle } from "@eagleuse/transform-eagle";
import { join } from "path";

(async () => {
  PLUGIN_API(join(process.env.LIBRARY, "./images"));
  transformEagle();
})();
