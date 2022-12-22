import prisma from "@/lib/prisma";

export default async function handler(req, res) {
  // findMany参考：https://www.prisma.io/docs/reference/api-reference/prisma-client-reference?query=t&page=1#findmany

  const page = +(req.query.page || 1);
  const pageSize = +(req.query.pageSize || 50);

  const [count, data] = await Promise.all([
    prisma.image.count({}),
    prisma.image.findMany({
      skip: (page - 1) * pageSize,
      take: pageSize,
    }),
  ]);

  res.json({
    count,
    page,
    pageSize,
    data,
  });
}
