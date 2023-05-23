import { type NextPage } from "next";
import { useMemo } from "react";

import { getImgUrl, transformByteToUnit } from "~/utils/common";
import { trpc } from "~/utils/trpc";
import Layout from "~/components/Layout";

const WorkSpace: NextPage = () => {
  const { data } = trpc.image.getByLibrary.useInfiniteQuery(
    { limit: 24, library: "r.library" },
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    },
  );

  const { data: config } = trpc.config.get.useQuery();

  const assetsUrl = useMemo(() => (config ? `http://${config?.ip}:${config?.assetsPort}` : null), [config]);

  const items = useMemo(() => data?.pages[0]?.items, [data]);

  return (
    <Layout>
      <>
        {assetsUrl && (
          <div className="grid grid-cols-6 gap-4 p-4">
            {items?.map((item) => (
              <div className="card glass" key={item.id}>
                <figure>
                  <img src={getImgUrl(assetsUrl, item)} alt={item.name} className="w-full object-cover aspect-square object-top" />
                </figure>
                <div className="card-body p-4">
                  <p className="text-lg truncate font-medium">{item.name}</p>
                  <p className="text-sm inline-flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                      <path d="M12.75 12.75a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM7.5 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM8.25 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM9.75 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM10.5 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM12.75 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM14.25 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM15 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM16.5 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM15 12.75a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM16.5 13.5a.75.75 0 100-1.5.75.75 0 000 1.5z" />
                      <path
                        fillRule="evenodd"
                        d="M6.75 2.25A.75.75 0 017.5 3v1.5h9V3A.75.75 0 0118 3v1.5h.75a3 3 0 013 3v11.25a3 3 0 01-3 3H5.25a3 3 0 01-3-3V7.5a3 3 0 013-3H6V3a.75.75 0 01.75-.75zm13.5 9a1.5 1.5 0 00-1.5-1.5H5.25a1.5 1.5 0 00-1.5 1.5v7.5a1.5 1.5 0 001.5 1.5h13.5a1.5 1.5 0 001.5-1.5v-7.5z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="ml-2">{item.modificationTime.toLocaleString("zh", { hour12: false })}</span>
                  </p>
                  <p className="text-sm inline-flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                      <path
                        fillRule="evenodd"
                        d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="uppercase ml-2">{item.ext}</span>
                    <span className="mr-1">,</span>
                    <span>
                      {item.width}×{item.height}
                    </span>
                    <span className="mr-1">,</span>
                    <span>{transformByteToUnit(item.size)}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </>
    </Layout>
  );
};

export default WorkSpace;
