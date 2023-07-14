import { type NextPage } from "next";
import Image from "next/image";
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

  const { data } = trpc.tags.get.useQuery({
    library: librarryName,
  });

  const Header = () => {
    return (
      <header className="bg-base-100/90 sticky left-0 top-0 z-20 w-full backdrop-blur xl:px-4">
        <nav className="navbar">
          <div className="flex-1">
            <label htmlFor="my-drawer" className="btn btn-ghost btn-circle lg:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-6 w-6">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                />
              </svg>
            </label>
            <a className="btn btn-ghost p-0 text-xl normal-case hover:bg-transparent">
              标签
              {data && <span className="badge ml-2">{data.length}</span>}
            </a>
          </div>
        </nav>
      </header>
    );
  };

  return (
    <Layout navbar={<Header />} href="/tags" loadMoreContent={<span className="text-base-300 text-sm">{"已经到底了~~"}</span>}>
      <>
        {assetsUrl && (
          <div className="grid grid-cols-2 gap-4 p-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-8">
            {data?.map((item) =>
              item._count.images ? (
                <Link href={`/${librarryName}?tag=${item.name}`} key={item.name} className="card glass relative overflow-hidden shadow-xl">
                  <div className="bg-neutral text-neutral-content flex aspect-square items-center justify-center">
                    {item.images[0] ? (
                      <div>
                        <Image fill alt={`first image in tag ${item.name}`} src={getImgUrl(assetsUrl, item.images[0])} className="aspect-square object-cover object-top" />
                      </div>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-40 w-40">
                        <path d="M19.5 21a3 3 0 003-3v-4.5a3 3 0 00-3-3h-15a3 3 0 00-3 3V18a3 3 0 003 3h15zM1.5 10.146V6a3 3 0 013-3h5.379a2.25 2.25 0 011.59.659l2.122 2.121c.14.141.331.22.53.22H19.5a3 3 0 013 3v1.146A4.483 4.483 0 0019.5 9h-15a4.483 4.483 0 00-3 1.146z" />
                      </svg>
                    )}
                  </div>
                  <div className="card-body bg-base-100/60 text-base-content absolute bottom-0 w-full p-4 backdrop-blur-sm">
                    <h2 className="card-title w-full justify-center">{item.name}</h2>
                  </div>
                  <button className="btn btn-square btn-sm btn-circle bg-secondary/30 text-secondary-content absolute right-1 top-1 z-10 border-none font-mono font-normal backdrop-blur">
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
