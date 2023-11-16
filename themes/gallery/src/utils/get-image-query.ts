import { trpc } from "@rao-pics/trpc";

import type { SettingType } from "~/states/setting";

/**
 * 获取 trpc Query
 * @param m search Param m
 * @param orderBy setting.orderBy
 */
export const getImageQuery = (
  m: string | null,
  orderBy: SettingType["orderBy"],
) => {
  const limit = 50;

  let find: ReturnType<typeof trpc.image.find.useInfiniteQuery> | undefined;
  let findTrash:
    | ReturnType<typeof trpc.image.findTrash.useInfiniteQuery>
    | undefined;
  let findByFolderId:
    | ReturnType<typeof trpc.image.findByFolderId.useInfiniteQuery>
    | undefined;

  if (!m) {
    if (!find) {
      find = trpc.image.find.useInfiniteQuery(
        { limit, includes: ["colors"], orderBy },
        {
          getNextPageParam: (lastPage) => lastPage.nextCursor,
        },
      );
    }

    return find;
  }

  if (m === "trash") {
    if (!findTrash) {
      findTrash = trpc.image.findTrash.useInfiniteQuery(
        { limit, includes: ["colors"], orderBy },
        {
          getNextPageParam: (lastPage) => lastPage.nextCursor,
        },
      );
    }

    return findTrash;
  }

  if (!findByFolderId) {
    findByFolderId = trpc.image.findByFolderId.useInfiniteQuery(
      { limit, includes: ["colors"], orderBy, id: m },
      {
        getNextPageParam: (lastPage) => lastPage.nextCursor,
      },
    );
  }

  return findByFolderId;
};
