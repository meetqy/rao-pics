import { type NextPage } from "next";
import { useRouter } from "next/router";
import PhotoSwipeLightbox from "photoswipe/lightbox";
import { useEffect, useMemo, useState } from "react";

import { getImgUrl, GridScreensConfig, transformByteToUnit } from "~/utils/common";
import { trpc } from "~/utils/trpc";
import Layout from "~/components/Layout";

import "photoswipe/style.css";

import { type ParsedUrlQuery } from "querystring";
import { useResponsive } from "ahooks";
import Image from "next/image";

import { type ExtEnum } from "@acme/api";
import { CONSTANT } from "@acme/constant";

import initLightboxVideoPlugin from "~/utils/photoswipe-video";
import { languages, type Lang } from "~/lang";

interface PageUrlQuery extends ParsedUrlQuery {
  library: string;
  ext: ExtEnum;
  orderBy: string;
  tag: string;
  folder: string;
  k: string;
  grid: string;
}

const IndexPage: NextPage = () => {
  const router = useRouter();

  const query = useMemo(() => router.query as PageUrlQuery, [router.query]);
  const orderBy = useMemo(() => {
    const [k = "createTime", v] = (query.orderBy || "createTime,desc").split(",");
    return { [k]: v };
  }, [query.orderBy]);

  const { data, fetchNextPage, hasNextPage } = trpc.image.get.useInfiniteQuery(
    { limit: 48, library: query.library, ext: query.ext, orderBy, tag: query.tag, folder: query.folder, keyword: query.k },
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    },
  );

  useEffect(() => {
    const lightbox = new PhotoSwipeLightbox({
      gallery: "#photoswipe",
      children: "a",
      showHideAnimationType: "none",
      pswpModule: () => import("photoswipe"),
    });

    initLightboxVideoPlugin(lightbox);

    lightbox.init();

    return () => {
      lightbox.destroy();
    };
  }, [data]);

  const { data: config } = trpc.config.get.useQuery();

  const language = useMemo(() => languages[(config?.lang ?? "zh_cn").replace("-", "_") as Lang], [config]);

  const assetsUrl = useMemo(() => (config ? `http://${config?.ip}:${config?.assetsPort}` : null), [config]);

  const items = useMemo(() => {
    return data?.pages.map((item) => item.items).flat();
  }, [data]);

  const onLoadMore = () => {
    if (hasNextPage) {
      void fetchNextPage();
    }
  };

  // 响应式相关
  const responsive = useResponsive();
  const [show, setShow] = useState<{
    body: boolean;
    gap: string;
    p: string;
  }>();
  useEffect(() => {
    let res = "";
    for (const k in responsive) {
      if (responsive[k]) res = k;
      else break;
    }

    const screen = GridScreensConfig[res];

    if (query.grid && screen) {
      setShow(screen[query.grid]);
    }
  }, [responsive, query.grid]);

  // 触发 tailwind jit 编译
  // grid-cols-1 grid-cols-2 grid-cols-3 grid-cols-4  grid-cols-6  grid-cols-8  grid-cols-12
  // gap-1 gap-2 gap-3 gap-4
  // p-1 p-2 p-3 p-4

  return (
    <Layout loadMore={onLoadMore} loadMoreContent={<span className="text-base-300 text-sm">{hasNextPage ? language.loading : language.noData}</span>}>
      <>
        {assetsUrl && show && (
          <div className={`grid ${show.gap} ${show.p} grid-cols-${query.grid}`} id="photoswipe">
            {items?.map((item, index) => (
              <div className="card glass cursor-pointer overflow-hidden transition-all duration-300 hover:-top-0.5 hover:shadow-lg" key={item.id}>
                <a
                  className=" bg-base-200/50 relative w-full overflow-hidden"
                  style={{ paddingBottom: "100%" }}
                  key={`${item.id}-${index}`}
                  target="_blank"
                  rel="noreferrer"
                  href={getImgUrl(assetsUrl, item, true)}
                  data-pswp-width={item.width}
                  data-pswp-height={item.height}
                  data-pswp-type={CONSTANT.VIDEO_EXT.includes(item.ext) ? "video" : "image"}
                >
                  <Image loading="lazy" fill draggable={false} src={getImgUrl(assetsUrl, item)} alt={item.name} className="object-cover object-top" />
                </a>

                <div className={`card-body ${show?.p} ${show?.body ? "flex" : "hidden"}`}>
                  <p className="truncate text-lg font-medium">{item.name}</p>
                  {(item.tags || item.folders) && (
                    <div className="space-x-2 text-xs">
                      {item.tags.map((tag) => (
                        <div className="badge badge-sm badge-secondary bg-secondary/50 border-none" key={tag.name}>
                          {tag.name}
                        </div>
                      ))}
                      {item.folders.map((folder) => (
                        <div className="badge badge-sm badge-primary bg-primary/50 border-none" key={folder.id}>
                          {folder.name}
                        </div>
                      ))}
                    </div>
                  )}
                  <p className="inline-flex items-center text-xs">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                      <path d="M12.75 12.75a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM7.5 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM8.25 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM9.75 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM10.5 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM12.75 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM14.25 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM15 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM16.5 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM15 12.75a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM16.5 13.5a.75.75 0 100-1.5.75.75 0 000 1.5z" />
                      <path
                        fillRule="evenodd"
                        d="M6.75 2.25A.75.75 0 017.5 3v1.5h9V3A.75.75 0 0118 3v1.5h.75a3 3 0 013 3v11.25a3 3 0 01-3 3H5.25a3 3 0 01-3-3V7.5a3 3 0 013-3H6V3a.75.75 0 01.75-.75zm13.5 9a1.5 1.5 0 00-1.5-1.5H5.25a1.5 1.5 0 00-1.5 1.5v7.5a1.5 1.5 0 001.5 1.5h13.5a1.5 1.5 0 001.5-1.5v-7.5z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="ml-2 font-mono">{item.lastTime.toLocaleString("zh", { hour12: false })}</span>
                  </p>
                  <p className="inline-flex flex-wrap items-center text-xs">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                      <path
                        fillRule="evenodd"
                        d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="ml-2 font-mono uppercase">{item.ext}</span>
                    <span className="mr-1">,</span>
                    <span className="font-mono">
                      {item.width}×{item.height}
                    </span>
                    <span className="mr-1">,</span>
                    <span className="font-mono">{transformByteToUnit(item.size)}</span>
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

export default IndexPage;
