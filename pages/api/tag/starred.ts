import prisma from "@/lib/prisma";

// 常用标签
export default async function handler(_req, res) {
  const [count, data] = await Promise.all([
    prisma.tag.count({
      where: {
        starred: true,
      },
    }),
    prisma.tag.findMany({
      where: {
        starred: true,
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
