import prisma from "@/lib/prisma";

// 未分类
export default async function handler(_req, res) {
  const [count, data] = await Promise.all([
    prisma.tag.count({
      where: {
        tagsGroups: {
          none: {},
        },
      },
    }),
    prisma.tag.findMany({
      where: {
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
