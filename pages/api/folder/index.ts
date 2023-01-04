import prisma from "@/lib/prisma";

export default async function handler(req, res) {
  const { orderBy } = req.query;

  const [count, data] = await Promise.all([
    prisma.folder.count(),
    prisma.folder.findMany({
      include: {
        _count: {
          select: {
            images: true,
          },
        },
        images: {
          take: 1,
        },
      },
      orderBy: orderBy || {
        images: {
          _count: "desc",
        },
      },
    }),
  ]);

  res.json({
    count,
    data,
  });
}
