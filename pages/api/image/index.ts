import prisma from "@/lib/prisma";

// 尺寸
const handleSize = ({ size }: EagleUse.SearchParams) => {
  if (!size) return [];

  const { width, height } = size;

  const and = [];

  // 宽度
  if (width.min) {
    and.push({
      width: { gte: width.min },
    });
  }

  if (width.max) {
    and.push({
      width: { lte: width.max },
    });
  }

  if (height.min) {
    and.push({
      height: { gte: height.min },
    });
  }

  if (height.max) {
    and.push({
      height: { gte: height.max },
    });
  }

  return and;
};

// 标签 || 未标签
const handleTags = ({ tags, noTags = false }: EagleUse.SearchParams) => {
  if (noTags) {
    return {
      tags: {
        none: {},
      },
    };
  }

  if (tags && tags.length > 0) {
    return {
      tags: {
        some: {
          id: {
            in: tags,
          },
        },
      },
    };
  }

  return {};
};

// prisma include 返回那些字段
// https://www.prisma.io/docs/reference/api-reference/prisma-client-reference#include
const handleIncludes = ({ includes }: EagleUse.SearchParams) => {
  const json = {};
  (includes || ["folders", "tags"]).forEach((item) => {
    json[item] = true;
  });

  return json;
};

// 排序
const handleOrderBy = ({ orderBy }: EagleUse.SearchParams) => {
  if (!orderBy) return { modificationTime: "desc" };
  const json = {};

  json[orderBy.field] = orderBy.by;
  return json;
};

export default async function handler(req, res) {
  // findMany参考：https://www.prisma.io/docs/reference/api-reference/prisma-client-reference?query=t&page=1#findmany
  const body = JSON.parse(req.body || "{}") as EagleUse.SearchParams;

  const page = +(req.query.page || 1);
  const pageSize = +(req.query.pageSize || 50);
  const include = handleIncludes(body);
  const where = {
    AND: [
      handleTags(body),
      ...handleSize(body),
      // 注释
      {
        annotation: {
          contains: body.annotation,
        },
      },
      // 扩展名
      { ext: body.ext || undefined },
      // 评级
      { star: body.star || undefined },
      // 删除 回收站
      { isDeleted: body.isDeleted || false },
    ],
  };

  const [count, data, sum] = await Promise.all([
    prisma.image.count({
      where,
    }),
    prisma.image.findMany({
      skip: (page - 1) * pageSize,
      take: pageSize,
      orderBy: handleOrderBy(body),
      include,
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
    where,
  });
}
