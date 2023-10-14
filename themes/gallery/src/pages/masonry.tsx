import { useEffect, useMemo, useRef } from "react";
import dynamic from "next/dynamic";
import Image from "next/legacy/image";
import { useWindowSize } from "@react-hook/window-size";
import {
  MasonryScroller,
  useContainerPosition,
  useInfiniteLoader,
  usePositioner,
} from "masonic";
import PhotoSwipeLightbox from "photoswipe/lightbox";

import { VIDEO_EXT } from "@rao-pics/constant";
import type { EXT } from "@rao-pics/constant";
import { numberToHex } from "@rao-pics/utils";

import initLightboxVideoPlugin from "~/utils/photoswipe-video";
import { trpc } from "~/utils/trpc";

import "photoswipe/style.css";

function Home() {
  const limit = 50;
  const containerRef = useRef(null);

  const { data: config } = trpc.config.findUnique.useQuery();

  const imageQuery = trpc.image.find.useInfiniteQuery(
    { limit, includes: ["colors"] },
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    },
  );

  const pages = imageQuery.data?.pages;

  const cardWidth = useRef<number>(240);

  const [windowWidth, windowHeight] = useWindowSize();

  const { offset, width } = useContainerPosition(containerRef, [
    windowWidth,
    windowHeight,
  ]);

  if (windowWidth >= 1536) {
    cardWidth.current = 240;
  } else if (windowWidth >= 1024 && windowWidth < 1536) {
    cardWidth.current = 220;
  } else if (windowWidth < 1024 && windowWidth >= 640) {
    cardWidth.current = Number(windowWidth / 3);
  } else {
    cardWidth.current = Number(windowWidth / 2);
  }

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
          bgColor: numberToHex(image.colors?.[0]?.rgb ?? 0),
          width: image.width,
          height: image.height,
          ext: image.ext as unknown as typeof EXT,
        };
      });
    });

    return result?.flat();
  }, [config?.ip, config?.serverPort, pages]);

  const positioner = usePositioner({
    width,
    columnGutter: windowWidth < 768 ? 8 : 12,
  });

  const onLoadMore = useInfiniteLoader(
    async () => {
      if (imageQuery.hasNextPage) {
        await imageQuery.fetchNextPage();
      }
    },
    {
      minimumBatchSize: limit,
      threshold: 3,
    },
  );

  useEffect(() => {
    let lightbox: PhotoSwipeLightbox | null = new PhotoSwipeLightbox({
      gallery: "#photo-swipe-lightbox",
      children: "a",
      pswpModule: () => import("photoswipe"),
      loop: false,
    });

    initLightboxVideoPlugin(lightbox);

    lightbox.init();

    return () => {
      lightbox?.destroy();
      lightbox = null;
    };
  });

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
        render={({ data, width: w }) => {
          const h = data.height / (data.width / (cardWidth.current ?? w));

          return (
            <a
              className="relative block rounded shadow"
              href={data.src}
              data-pswp-width={data.width}
              data-pswp-height={data.height}
              data-pswp-type={VIDEO_EXT.includes(data.ext) ? "video" : "image"}
              style={{
                backgroundColor: data.bgColor + "7F",
                height: h,
              }}
              target="_blank"
              rel="noreferrer"
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
}

export default dynamic(() => Promise.resolve(Home), { ssr: false });
