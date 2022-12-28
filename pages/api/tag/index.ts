import prisma from "@/lib/prisma";

export default async function handler(_req, res) {
  const [count, data] = await Promise.all([
    prisma.tag.count(),
    prisma.tag.findMany({
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
