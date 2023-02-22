import { logger } from "@eagleuse/utils";
import { getPrisma } from "./prisma";

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
        logger.info(e, "[clearImageZero] deleteMany: ");
      });
  },
};

export default TagPrisma;
