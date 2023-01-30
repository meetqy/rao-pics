import { getPrisma } from "@/lib/prisma";

export default async function handler(_req, res) {
  const prisma = getPrisma();

  const where = {
    // 排除图片数量为0的标签
    NOT: {
      images: {
        none: {},
      },
    },
  };

  const [count, data] = await Promise.all([
    prisma.tag.count({ where }),
    prisma.tag.findMany({
      where,
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
