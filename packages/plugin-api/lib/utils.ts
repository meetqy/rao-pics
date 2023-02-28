export const handleInclude = (include: string) => {
  if (!include) return null;

  const json = {};

  include.split(",").map((item) => {
    json[item] = true;
  });

  return json;
};

export const handleOrderBy = (orderBy: string) => {
  const json = {};

  const [k, v] = orderBy.split(",");
  json[k] = v;

  return json;
};
