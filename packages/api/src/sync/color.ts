import { difference } from "lodash";

import { router } from "../..";

export const syncColor = async (
  newColors: number[] = [],
  oldColors: number[] = [],
) => {
  const caller = router.createCaller({});

  const disconnect = difference(oldColors, newColors);
  const connect = difference(newColors, oldColors);

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
