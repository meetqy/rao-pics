import { Prisma } from "@eagleuse/prisma-client";

export const handleInclude = (include: string): Prisma.ImageInclude => {
  if (!include) return null;

  const json = {};

  include.split(",").map((item) => {
    json[item] = true;
  });

  return json;
};

export const handleOrderBy = (orderBy: string) => {
  if (!orderBy) return { btime: "asc" };
  const json = {};

  const [k, v] = orderBy.split(",");
  json[k] = v;

  return json;
};
