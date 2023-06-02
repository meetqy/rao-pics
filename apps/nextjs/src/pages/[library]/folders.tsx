import { type NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useMemo } from "react";

import { getImgUrl } from "~/utils/common";
import { trpc } from "~/utils/trpc";
import Layout from "~/components/Layout";

const Page: NextPage = () => {
  const router = useRouter();
  const librarryName = router.query.library as string;

  const { data: config } = trpc.config.get.useQuery();
  const assetsUrl = useMemo(() => (config ? `http://${config?.ip}:${config?.assetsPort}` : null), [config]);

  const { data } = trpc.folders.get.useQuery({
    library: librarryName,
  });

  return (
    <Layout href="/folders" loadMoreContent={<span className="text-base-300 text-sm">{"已经到底了~~"}</span>}>
      <>
        {assetsUrl && (
          <div className="p-4 grid gap-4 grid-cols-8">
            {data?.map((item) =>
              item._count.images ? (
                <Link href={`/${librarryName}?folder=${item.name}`} key={item.id} className="card overflow-hidden bg-base-100 shadow-xl relative">
                  <div className="aspect-square flex justify-center items-center bg-neutral text-neutral-content">
                    {item.images[0] ? (
                      <img src={getImgUrl(assetsUrl, item.images[0])} className="object-top object-cover aspect-square" />
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-40 h-40">
                        <path d="M19.5 21a3 3 0 003-3v-4.5a3 3 0 00-3-3h-15a3 3 0 00-3 3V18a3 3 0 003 3h15zM1.5 10.146V6a3 3 0 013-3h5.379a2.25 2.25 0 011.59.659l2.122 2.121c.14.141.331.22.53.22H19.5a3 3 0 013 3v1.146A4.483 4.483 0 0019.5 9h-15a4.483 4.483 0 00-3 1.146z" />
                      </svg>
                    )}
                  </div>
                  <div className="card-body p-4">
                    <p>{item.name}</p>
                  </div>
                  <button className="btn btn-square absolute left-1 top-1 btn-sm font-mono btn-circle backdrop-blur bg-primary/30 text-primary-content font-normal border-none">
                    {item._count.images}
                  </button>
                </Link>
              ) : null,
            )}
          </div>
        )}
      </>
    </Layout>
  );
};

export default Page;
