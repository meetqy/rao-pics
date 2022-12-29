import prisma from "@/lib/prisma";

// 尺寸
const hanleSize = (body: EagleUse.SearchParams) => {};

export default async function handler(req, res) {
  // findMany参考：https://www.prisma.io/docs/reference/api-reference/prisma-client-reference?query=t&page=1#findmany
  const page = +(req.query.page || 1);
  const pageSize = +(req.query.pageSize || 50);
  const body = JSON.parse(req.body || "{}");

  const where = {};

  if (body.tags && body.tags.length > 0) {
    where["tags"] = {
      some: {
        id: {
          in: body.tags,
        },
      },
    };
  }

  const [count, data, sum] = await Promise.all([
    prisma.image.count({
      where,
    }),
    prisma.image.findMany({
      skip: (page - 1) * pageSize,
      take: pageSize,
      orderBy: {
        modificationTime: "desc",
      },
      include: {
        tags: true,
      },
      where,
    }),
    prisma.image.aggregate({
      where,
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
