import { transformEagle } from "@eagleuse/transform-eagle";

(async () => {
  if (process.env.TRANSFORM != "false") {
    transformEagle();
  }
})();
