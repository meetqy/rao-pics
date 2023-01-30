import { getPrisma } from "@/lib/prisma";

export default async function handler(_req, res) {
  const prisma = getPrisma();

  const [count, data] = await Promise.all([
    prisma.tagsGroups.count(),
    prisma.tagsGroups.findMany({
      include: {
        tags: true,
      },
    }),
  ]);

  res.json({
    count,
    data,
  });
}
