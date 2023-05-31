import { type NextPage } from "next";

import { trpc } from "~/utils/trpc";
import Layout from "~/components/Layout";

const Page: NextPage = () => {
  const { data } = trpc.tags.get.useQuery();

  return (
    <Layout href="/tags" loadMoreContent={<span className="text-base-300 text-sm">{"已经到底了~~"}</span>}>
      <div className="flex flex-wrap p-4 gap-4">
        {data?.map((item) => (
          <button className="btn capitalize" key={item.name}>
            {item.name}
            <div className="badge badge-secondary ml-2">{item._count.images}</div>
          </button>
        ))}
      </div>
    </Layout>
  );
};

export default Page;
