export const handleOrderBy = ({ orderBy }: EagleUse.SearchParams) => {
  if (!orderBy) return { modificationTime: "desc" };
  const json = {};

  json[orderBy.field] = orderBy.by;
  return json;
};

// 尺寸
export const handleSize = ({ size }: EagleUse.SearchParams) => {
  if (!size) return undefined;

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
