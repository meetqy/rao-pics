import { type NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";

import { trpc } from "~/utils/trpc";
import Layout from "~/components/Layout";

const Page: NextPage = () => {
  const { data } = trpc.tags.get.useQuery();
  const router = useRouter();
  const librarryName = router.query.library as string;

  return (
    <Layout href="/tags" loadMoreContent={<span className="text-base-300 text-sm">{"已经到底了~~"}</span>}>
      <div className="flex flex-wrap p-4 gap-4">
        {data?.map((item) => (
          <Link href={`/${librarryName}?tag=${item.name}`} className="btn capitalize" key={item.name}>
            {item.name}
            <div className="badge badge-secondary ml-2">{item._count.images}</div>
          </Link>
        ))}
      </div>
    </Layout>
  );
};

export default Page;
