import { startStaticServer } from "./src";

export * from "./src";

void (async () => {
  await startStaticServer("/Users/meetqy/Pictures/test.library/images", 4000);
})();
