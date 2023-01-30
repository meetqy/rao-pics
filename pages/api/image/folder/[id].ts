import { getPrisma } from "@/lib/prisma";

export default async function handler(req, res) {
  const prisma = getPrisma();

  const { id } = req.query;
  const page = +(req.query.page || 1);
  const pageSize = +(req.query.pageSize || 50);

  const where = {
    folders: {
      some: {
        id: {
          in: id,
        },
      },
    },
    isDeleted: false,
  };

  const [count, data, sum] = await prisma.$transaction([
    prisma.image.count({
      where,
    }),
    prisma.image.findMany({
      where,
      skip: (page - 1) * pageSize,
      take: pageSize,
      include: {
        tags: true,
      },
    }),
    prisma.image.aggregate({
      where: where,
      _sum: {
        size: true,
      },
    }),
  ]);

  return res.json({
    count,
    size: sum._sum.size,
    page,
    pageSize,
    data,
    where,
  });
}
