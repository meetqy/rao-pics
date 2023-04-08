import { Prisma, Image, Tag } from "@raopics/prisma-client";
import _ from "lodash";
import { Metadata } from "../types";

function getPrismaParams(
  data: Metadata,
  oldData: Image & {
    tags: Tag[];
  }
): [Prisma.ImageCreateInput, boolean] {
  // 是否有需要 disconnect 的标签
  let disconnect = false;

  let tags = {},
    folders = {};

  if (data.folders) {
    folders = {
      connect: data.folders.map((folder) => ({ id: folder })),
    };
  }

  if (data.tags) {
    tags = {
      connectOrCreate: data.tags.map((tag) => ({
        where: { id: tag },
        create: { id: tag, name: tag },
      })),
    };

    if (oldData && oldData.tags) {
      // 标签 从 a => b
      // 1.需要 disconnect a
      // 2.如果 a 标签所关联的图片数量小于1 需要删除
      const disconnectTags = _.difference(
        oldData.tags.map((tag) => tag.id),
        data.tags as string[]
      );

      if (disconnectTags.length > 0) {
        tags["disconnect"] = disconnectTags.map((tag) => ({ id: tag }));
        disconnect = true;
      }
    }
  }

  // 浮点数只能用string来存储
  if (data.ext.toLocaleLowerCase() === "mp4") {
    data.duration = data.duration.toString();
  }

  return [
    {
      ...data,
      tags,
      folders,
      palettes: JSON.stringify(data.palettes),
    },
    disconnect,
  ];
}

export default getPrismaParams;
