import differenceBy from "lodash.differenceby";

import { type Prisma } from "@acme/db";

/**
 * 更新标签
 * @param tags 当前的标签
 * @param oldTags 修改之前的
 * @returns prisma 更新标签的参数
 */
export const updateTags = (tags: string[], oldTags: string[]): Prisma.TagUpdateManyWithoutImagesNestedInput => {
  const waitDeleteIds = tags.length === 0 ? oldTags : differenceBy(oldTags, tags);

  return {
    disconnect: waitDeleteIds.map((item) => ({ name: item })),
    connect: tags.map((tag) => ({ name: tag })),
  };
};
