import prisma from "@/lib/prisma";

export default async function handler(_req, res) {
  const [count, data] = await Promise.all([
    prisma.folder.count(),
    prisma.folder.findMany({
      include: {
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
