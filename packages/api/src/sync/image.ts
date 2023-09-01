import { readJsonSync, statSync } from "fs-extra";

import { EXT } from "@rao-pics/constant";

import { router } from "../..";

export const checkedImage = async (path: string) => {
  try {
    const { mtime } = statSync(path);

    const caller = router.createCaller({});
    const image = await caller.image.findUnique({
      path,
    });

    if (image) {
      // 对比时间，如果小于3秒，不更新
      if (mtime.getTime() - image.lastTime.getTime() < 3000) {
        return;
      }
    }

    const data = readJsonSync(path) as Metadata;

    if (!EXT.includes(data.ext)) {
      throw new Error("not support file type");
    }

    return data;
  } catch (error) {
    throw new Error("read json error");
  }
};
