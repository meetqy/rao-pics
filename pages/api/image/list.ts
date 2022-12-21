import prisma from "@/lib/prisma";

/**
 * @openapi
 * /api/image/list:
 *   post:
 *     tags:
 *       - Image
 *     summary: 获取图片列表
 *     parameters:
 *       - name: skip
 *         in: query
 *         description: skip
 *         schema:
 *            type: int
 *            default: 0
 *       - name: take
 *         in: query
 *         description: pageSize
 *         schema:
 *           type: int
 *           default: 50
 *     responses:
 *       200:
 *         description: Returns Object
 */
export default async function handler(req, res) {
  // findMany参考：https://www.prisma.io/docs/reference/api-reference/prisma-client-reference?query=t&page=1#findmany

  const { skip = 0, take = 50 } = req.query;

  const [count, data] = await Promise.all([
    prisma.image.count({}),
    prisma.image.findMany({
      skip: parseInt(skip),
      take: parseInt(take),
    }),
  ]);

  res.json({
    count,
    take,
    skip,
    data,
  });
}
