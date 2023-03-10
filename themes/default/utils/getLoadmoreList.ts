import { Image, Prisma } from "@eagleuse/prisma-client";

interface QueryParams {
  w: (string | null)[] | null | undefined;
  h: (string | null)[] | null | undefined;
  k: string | undefined | null;
  ext: string | undefined | null;
  page: number | undefined | null;
}

export interface MoreListResult {
  list: Image[];
  queryParams: QueryParams;
  count: number;
  size: number;
  pageSize: number;
}

export const getLoadMoreList = (queryParams: QueryParams): Promise<MoreListResult> => {
  const { w, h, k, ext } = queryParams;
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
            // 回收站
            { isDeleted: false },
          ],
        } as Prisma.ImageWhereInput,
        include: { tags: true },
      }),
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
