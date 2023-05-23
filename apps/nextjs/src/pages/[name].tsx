import { type NextPage } from "next";
import { useMemo } from "react";

import { getImgUrl } from "~/utils/common";
import { trpc } from "~/utils/trpc";
import Layout from "~/components/Layout";

const WorkSpace: NextPage = () => {
  const { data } = trpc.image.getByLibrary.useInfiniteQuery(
    { limit: 24, library: "r.library" },
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    },
  );

  const items = useMemo(() => data?.pages[0]?.items, [data]);

  return (
    <Layout>
      <div className="grid grid-cols-6 gap-4 p-4">
        {items?.map((item) => (
          <div className="card glass" key={item.id}>
            <figure>
              <img src={getImgUrl(item)} alt={item.name} className="w-full object-cover aspect-square object-top" />
            </figure>
            <div className="card-body p-4">
              <p className="text-lg truncate">{item.name}</p>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default WorkSpace;
