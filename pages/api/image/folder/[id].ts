import prisma from "@/lib/prisma";

export default async function handler(req, res) {
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
  };

  const [count, data] = await prisma.$transaction([
    prisma.image.count({
      where,
    }),
    prisma.image.findMany({
      where: {
        folders: {
          some: {
            id: {
              in: id,
            },
          },
        },
      },
      skip: (page - 1) * pageSize,
      take: pageSize,
    }),
  ]);

  return res.json({
    count,
    data,
  });
}
