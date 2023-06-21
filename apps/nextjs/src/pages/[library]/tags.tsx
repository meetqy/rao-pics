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

  const { data } = trpc.tags.get.useQuery({
    library: librarryName,
  });

  const Header = () => {
    return (
      <header className="w-full sticky top-0 left-0 z-20 xl:px-4 bg-base-100/90 backdrop-blur">
        <nav className="navbar">
          <div className="flex-1">
            <label htmlFor="my-drawer" className="btn btn-ghost btn-circle lg:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                />
              </svg>
            </label>
            <a className="btn btn-ghost normal-case p-0 hover:bg-transparent text-xl">
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
          <div className="p-4 grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-8">
            {data?.map((item) =>
              item._count.images ? (
                <Link href={`/${librarryName}?tag=${item.name}`} key={item.name} className="card glass overflow-hidden shadow-xl relative">
                  <div className="aspect-square flex justify-center items-center bg-neutral text-neutral-content">
                    {item.images[0] ? (
                      <img src={getImgUrl(assetsUrl, item.images[0])} className="object-top object-cover aspect-square" />
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-40 h-40">
                        <path d="M19.5 21a3 3 0 003-3v-4.5a3 3 0 00-3-3h-15a3 3 0 00-3 3V18a3 3 0 003 3h15zM1.5 10.146V6a3 3 0 013-3h5.379a2.25 2.25 0 011.59.659l2.122 2.121c.14.141.331.22.53.22H19.5a3 3 0 013 3v1.146A4.483 4.483 0 0019.5 9h-15a4.483 4.483 0 00-3 1.146z" />
                      </svg>
                    )}
                  </div>
                  <div className="card-body p-4 absolute bottom-0 bg-base-100/60 text-base-content w-full backdrop-blur-sm">
                    <h2 className="card-title justify-center w-full">{item.name}</h2>
                  </div>
                  <button className="btn btn-square absolute z-10 right-1 top-1 btn-sm font-mono btn-circle backdrop-blur bg-secondary/30 text-secondary-content font-normal border-none">
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
