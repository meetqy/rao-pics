import prisma from "@/lib/prisma";

// 未分类
export default async function handler(_req, res) {
  const where = {
    // 排除图片数量为0的标签
    NOT: {
      images: {
        none: {},
      },
    },
  };

  const [count, data] = await Promise.all([
    prisma.tag.count({
      where: {
        ...where,
        tagsGroups: {
          none: {},
        },
      },
    }),
    prisma.tag.findMany({
      where: {
        ...where,
        tagsGroups: {
          none: {},
        },
      },
      include: {
        tagsGroups: true,
        _count: {
          select: {
            images: true,
          },
        },
      },
    }),
  ]);

  res.json({
    count,
    data,
  });
}
