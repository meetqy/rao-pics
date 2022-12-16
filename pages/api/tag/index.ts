import prisma from "@/lib/prisma";

/**
 * @openapi
 * /api/tag:
 *   get:
 *     description: 获取所有标签信息
 *     responses:
 *       200:
 *         description: Returns Object
 */
export default async function handler(_req, res) {
  const [count, data] = await Promise.all([
    prisma.tag.count(),
    prisma.tag.findMany(),
  ]);

  res.json({
    count,
    data,
  });
}
