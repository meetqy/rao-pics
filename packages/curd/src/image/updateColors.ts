import differenceBy from "lodash.differenceby";

import { type Color } from "@acme/db";

/**
 * 更新颜色
 * @param colors 当前颜色
 * @param oldColors 修改之前的颜色
 * @returns prisma 更新颜色的参数
 */
export const updateColors = (colors: Color[], oldColors: Color[]) => {
  const waitDeleteIds = colors.length === 0 ? oldColors : differenceBy(oldColors, colors, "rgb");

  return {
    disconnect: waitDeleteIds,
    connect: colors,
  };
};
