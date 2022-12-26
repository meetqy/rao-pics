import prisma from "@/lib/prisma";

export default async function handler(req, res) {
  // findMany参考：https://www.prisma.io/docs/reference/api-reference/prisma-client-reference?query=t&page=1#findmany
  const page = +(req.query.page || 1);
  const pageSize = +(req.query.pageSize || 50);

  const [count, data, sum] = await Promise.all([
    prisma.image.count({}),
    prisma.image.findMany({
      skip: (page - 1) * pageSize,
      take: pageSize,
      orderBy: {
        modificationTime: "desc",
      },
      include: {
        tags: true,
      },
    }),
    prisma.image.aggregate({
      _sum: {
        size: true,
      },
    }),
  ]);

  res.json({
    count,
    size: sum._sum.size,
    page,
    pageSize,
    data,
  });
}
