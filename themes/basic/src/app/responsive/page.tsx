"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/legacy/image";
import { useSearchParams } from "next/navigation";
import { useWindowSize } from "@react-hook/window-size";
import {
  MasonryScroller,
  useContainerPosition,
  useInfiniteLoader,
  usePositioner,
} from "masonic";
import PhotoSwipeLightbox from "photoswipe/lightbox";

import type { EXT } from "@rao-pics/constant";
import { VIDEO_EXT } from "@rao-pics/constant";
import { numberToHex } from "@rao-pics/utils";

import initLightboxVideoPlugin from "~/utils/photoswipe-video";
import { trpc } from "~/utils/trpc";

const Page = () => {
  const searchParams = useSearchParams();

  const folder = searchParams.get("f");

  const limit = 50;
  const containerRef = useRef(null);

  const [windowWidth, windowHeight] = useWindowSize();
  const { offset, width } = useContainerPosition(containerRef, [
    windowWidth,
    windowHeight,
  ]);

  const { data: config } = trpc.config.findUnique.useQuery();
  const imageQuery = trpc.image.find.useInfiniteQuery(
    { limit, includes: ["colors"], orderBy: "desc" },
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    },
  );

  console.log(imageQuery);

  const pages = imageQuery.data?.pages;

  const images = useMemo(() => {
    const result = pages?.map((page) => {
      return page.data.map((image) => {
        const id = image.path.split(/\/|\\/).slice(-2)[0];
        const host = `http://${config?.ip}:${config?.serverPort}`;
        const src = `${host}/static/${id}/${image.name}.${image.ext}`;
        const thumbnailPath = image.noThumbnail
          ? src
          : `${host}/static/${id}/${image.name}_thumbnail.png`;

        return {
          id: image.id,
          src,
          thumbnailPath,
          msrc: thumbnailPath,
          bgColor: numberToHex(image.colors?.[0]?.rgb ?? 0),
          width: image.width,
          height: image.height,
          ext: image.ext as unknown as typeof EXT,
          type: VIDEO_EXT.includes(image.ext) ? "video" : "image",
        };
      });
    });

    return result?.flat();
  }, [config?.ip, config?.serverPort, pages]);

  const [isLoad, setLoad] = useState(false);

  useEffect(() => {
    if (images?.length && !isLoad) {
      setLoad(true);
    }
  }, [images, isLoad]);

  const positioner = usePositioner(
    {
      width,
      columnGutter: windowWidth < 768 ? 8 : 12,
      rowGutter: windowWidth < 768 ? 8 : 12,
      columnWidth: windowWidth < 768 ? windowWidth / 3 : 224,
    },
    [isLoad],
  );

  const onLoadMore = useInfiniteLoader(
    async () => {
      if (imageQuery.hasNextPage) {
        await imageQuery.fetchNextPage();
      }
    },
    { minimumBatchSize: limit },
  );

  const lightbox: PhotoSwipeLightbox | null = new PhotoSwipeLightbox({
    pswpModule: () => import("photoswipe"),
    loop: false,
  });

  initLightboxVideoPlugin(lightbox);
  lightbox.init();

  return (
    <main className="p-2 md:p-3" id="photo-swipe-lightbox">
      <MasonryScroller
        onRender={onLoadMore}
        positioner={positioner}
        offset={offset}
        height={windowHeight}
        containerRef={containerRef}
        items={images ?? []}
        itemKey={(data) => data.id}
        render={({ data, width: w, index }) => {
          const m = data.width / w;
          const h = data.height / m;

          return (
            <a
              className="relative block rounded shadow"
              href={data.src}
              style={{
                backgroundColor: data.bgColor + "0C",
                height: h,
              }}
              target="_blank"
              rel="noreferrer"
              onClick={(e) => {
                e.preventDefault();

                lightbox.loadAndOpen(index, images ?? []);
              }}
            >
              <Image
                src={data.thumbnailPath}
                layout="fill"
                className="rounded"
              />
            </a>
          );
        }}
      />
    </main>
  );
};

export default Page;
