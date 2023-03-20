import { logger } from "@raopics/utils";
import { getPrisma } from "@raopics/prisma-client";

const prisma = getPrisma();

const TagPrisma = {
  delete: (tags: { id: string }[]) => {
    prisma.tag.deleteMany({
      where: {
        OR: tags,
      },
    });
  },

  // 删除关联图片为0的tag
  clearImageZero: () => {
    prisma.tag
      .deleteMany({
        where: {
          images: {
            none: {},
          },
        },
      })
      .then((e) => {
        logger.debug(e, "Clear tag with image count less than 1: ");
      });
  },
};

export default TagPrisma;
