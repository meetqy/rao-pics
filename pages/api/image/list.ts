import prisma from "@/lib/prisma";

export default async function handler(req, res) {
  // findMany参考：https://www.prisma.io/docs/reference/api-reference/prisma-client-reference?query=t&page=1#findmany

  const { page = 1, pageSize = 50 } = req.query;

  const [count, data] = await Promise.all([
    prisma.image.count({}),
    prisma.image.findMany({
      skip: (parseInt(page) - 1) * pageSize,
      take: parseInt(pageSize),
    }),
  ]);

  res.json({
    count,
    page,
    pageSize,
    data,
  });
}
