import prisma from "@/lib/prisma";

export default async function handler(req, res) {
  const { id } = req.query;
  const page = +(req.query.page || 1);
  const pageSize = +(req.query.pageSize || 50);

  const result = await prisma.folder.findUnique({
    where: {
      id,
    },
    include: {
      _count: {
        select: {
          images: true,
        },
      },
      images: {
        skip: (page - 1) * pageSize,
        take: pageSize,
      },
    },
  });

  return res.json(result);
}
