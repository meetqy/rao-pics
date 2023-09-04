import { readJsonSync, statSync } from "fs-extra";

import { EXT } from "@rao-pics/constant";

import { router } from "../..";

/**
 * 检测图片是否需要更新
 * @param path
 */
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

export const createImage = async (data: Metadata) => {
  const caller = router.createCaller({});

  // const image = await caller.image.upsert({

  // });
  // const image = await caller.image.create({
  //   data: {
  //     path,
  //     name: data.name,
  //     ext: data.ext,
  //     size: data.size,
  //     width: data.width,
  //     height: data.height,
  //     lastTime: data.lastTime,
  //     createTime: data.createTime,
  //   },
  // });

  // return image;
};
