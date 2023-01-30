import { getPrisma } from "@/lib/prisma";

export default async function handler(req, res) {
  const prisma = getPrisma();

  const [all, notTag, tags, recycle] = await Promise.all([
    prisma.image.count(),
    prisma.image.count({
      where: {
        tags: {
          none: {},
        },
      },
    }),
    prisma.tag.count({
      where: {
        starred: false,
      },
    }),
    prisma.image.count({
      where: {
        isDeleted: true,
      },
    }),
  ]);

  res.json({
    all,
    "not-tag": notTag,
    tags,
    recycle,
  });
}
