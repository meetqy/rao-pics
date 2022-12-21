import prisma from "@/lib/prisma";

/**
 * @openapi
 * /api/image/list:
 *   post:
 *     tags:
 *       - Image
 *     summary: 获取图片列表
 *     parameters:
 *       - name: page
 *         in: query
 *         description: page
 *         schema:
 *            type: int
 *            default: 0
 *       - name: pageSize
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
