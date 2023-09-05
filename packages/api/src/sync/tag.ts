import { difference } from "lodash";

import { router } from "../..";

export const syncTag = async (
  newTags: string[] = [],
  oldTags: string[] = [],
) => {
  const caller = router.createCaller({});

  const disconnect = difference(oldTags, newTags);
  const connect = difference(newTags, oldTags);

  if (connect.length > 0) {
    for (const item of connect) {
      await caller.tag.upsert(item);
    }
  }

  return {
    disconnect,
    connect,
  };
};
