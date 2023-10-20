import { difference } from "lodash";

import { router } from "../..";

/**
 * 对比 color 找出 disconnect 和 connect
 * @param newColors
 * @param oldColors
 * @returns
 */
export const diffColor = async (
  newColors: number[] = [],
  oldColors: number[] = [],
) => {
  const caller = router.createCaller({});

  const disconnect = difference(oldColors, newColors);
  const connect = difference(newColors, oldColors).slice(0, 9);

  if (connect.length > 0) {
    for (const item of connect) {
      await caller.color.upsert(item);
    }
  }

  return {
    disconnect,
    connect,
  };
};
