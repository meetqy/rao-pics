import { type NextPage } from "next";
import { useMemo } from "react";

import { trpc } from "~/utils/trpc";
import Layout from "~/components/Layout";

const WorkSpace: NextPage = () => {
  const { data } = trpc.image.getByLibrary.useInfiniteQuery(
    { limit: 20, library: "test.library" },
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    },
  );

  const items = useMemo(() => data?.pages[0]?.items, [data]);

  console.log(items);

  return (
    <Layout>
      <div className="grid grid-cols-4 gap-4">
        {items?.map((item) => (
          <div className="card w-96 glass">
            <figure>
              <img src="/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="car!" />
            </figure>
            <div className="card-body">
              <h2 className="card-title">Life hack</h2>
              <p>How to park your car at your garage?</p>
              <div className="card-actions justify-end">
                <button className="btn btn-primary">Learn now!</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default WorkSpace;
