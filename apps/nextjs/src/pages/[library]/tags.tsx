import { type NextPage } from "next";

import { trpc } from "~/utils/trpc";
import Layout from "~/components/Layout";

const Page: NextPage = () => {
  const { data } = trpc.tags.get.useQuery();

  return (
    <Layout href="/tags" loadMoreContent={<span className="text-base-300 text-sm">{"已经到底了~~"}</span>}>
      <div className="grid grid-cols-10 p-4 gap-4">
        {data?.map((item) => (
          <div key={item.tags} className="card card-compact bg-base-100 shadow-xl overflow-hidden">
            <div className=" bg-neutral text-neutral-content aspect-video flex justify-center items-center text-5xl font-serif">{item.tags?.substring(0, 1)}</div>
            <div className="card-body">
              <p>If a dog chews shoes whose shoes does he choose?</p>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default Page;
