import { logger } from "@raopics/utils";
import { getPrisma } from "@raopics/prisma-client";

const TagPrisma = {
  delete: (tags: { id: string }[]) => {
    getPrisma().tag.deleteMany({
      where: {
        OR: tags,
      },
    });
  },

  // 删除关联图片为0的tag
  clearImageZero: () => {
    getPrisma()
      .tag.deleteMany({
        where: {
          images: {
            none: {},
          },
        },
      })
      .then((e) => {
        logger.debug(e, "[transform-eagle] Clear tag with image count less than 1: ");
      });
  },
};

export default TagPrisma;
