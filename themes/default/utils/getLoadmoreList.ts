import { Prisma } from "@eagleuse/prisma-client";

interface QueryParams {
  // [min width, max width]
  w: (string | null)[] | null | undefined;
  // [min height, max height]
  h: (string | null)[] | null | undefined;
  // 关键词
  k: string | undefined | null;
  // 扩展名
  ext: string | undefined | null;
  // 当前页
  page: number | undefined | null;
  // 排序 [字段, desc | asc]
  s: (string | null)[] | null | undefined;
}

export interface MoreListResult {
  list: EagleUse.Image[];
  queryParams: QueryParams;
  count: number;
  size: number;
  pageSize: number;
}

export const getLoadMoreList = (
  queryParams: QueryParams,
  more?: Prisma.Enumerable<Prisma.ImageWhereInput>
): Promise<MoreListResult> => {
  const { w, h, k, ext, s } = queryParams;
  const page = queryParams.page || 1;
  const pageSize = 50;

  return new Promise((resolve, reject) => {
    fetch(`/api/image?page=${page}&pageSize=${pageSize}`, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        where: {
          AND: [
            ...handleSize({ w, h }),
            // 扩展名
            ext && { ext: { contains: ext } },
            // 关键词
            k && { OR: [{ annotation: { contains: k } }, { name: { contains: k } }] },
          ]
            .concat(more || { isDeleted: false })
            .filter((item) => item), // 排除null
        } as Prisma.ImageWhereInput,
        include: { tags: true },
        orderBy: handleOrderBy(s),
      } as Prisma.ImageFindManyArgs),
    })
      .then((res) => res.json())
      .then(({ data, count, size }) => {
        resolve({
          list: data,
          queryParams: {
            ...queryParams,
            page,
          },
          pageSize,
          count,
          size,
        });
      })
      .catch(reject);
  });
};

const handleOrderBy = (s: QueryParams["s"]): Prisma.Enumerable<Prisma.ImageOrderByWithRelationInput> => {
  const json: Prisma.Enumerable<Prisma.ImageOrderByWithRelationInput> = {};

  if (!s) {
    // 默认值
    json.modificationTime = "desc";
  } else {
    const field = (s[0] || "modificationTime") as keyof Prisma.ImageOrderByWithRelationInput;
    const type = (s[1] || "desc") as Prisma.SortOrder;
    json[field] = type;
  }

  return json;
};

const handleSize = (size: { w: QueryParams["w"]; h: QueryParams["h"] }): Prisma.ImageWhereInput[] => {
  const { w, h } = size;
  const params: Prisma.ImageWhereInput[] = [];

  if (w) {
    const [wMin, wMax] = w;

    wMin && params.push({ width: { gte: +wMin } });
    wMax && params.push({ width: { lte: +wMax } });
  }

  if (h) {
    const [hMin, hMax] = h;

    hMin && params.push({ height: { gte: +hMin } });
    hMax && params.push({ height: { lte: +hMax } });
  }

  return params;
};
