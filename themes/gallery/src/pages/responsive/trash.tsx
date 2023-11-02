import { useEffect, useMemo, useRef } from "react";
import dynamic from "next/dynamic";
import Image from "next/legacy/image";
import { useWindowSize } from "@react-hook/window-size";
import justifyLayout from "justified-layout";
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

import { useRecoilState } from "recoil";

import { settingSelector } from "~/states/setting";

type JustifyLayoutResult = ReturnType<typeof justifyLayout>;

function Home() {
  const limit = 50;
  const containerRef = useRef(null);
  const [setting, setSetting] = useRecoilState(settingSelector);
  const [windowWidth, windowHeight] = useWindowSize();
  const { offset, width } = useContainerPosition(containerRef, [
    windowWidth,
    windowHeight,
  ]);

  const { data: config } = trpc.config.findUnique.useQuery();

  const imageQuery = trpc.image.findTrash.useInfiniteQuery(
    { limit, includes: ["colors"], orderBy: setting.orderBy },
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    },
  );

  const pages = imageQuery.data?.pages;
  const count = imageQuery.data?.pages[0]?.count;

  useEffect(() => {
    if (count) {
      setSetting((prev) => ({
        ...prev,
        trashCount: count,
      }));
    }
  }, [count, setSetting]);

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

  const items = useMemo(() => {
    if (images && width) {
      const results: JustifyLayoutResult[] = [];
      const imageTemp = JSON.parse(JSON.stringify(images)) as typeof images;
      const imageResult: (typeof images)[] = [];

      while (imageTemp.length > 0) {
        const result = justifyLayout(imageTemp, {
          maxNumRows: 1,
          containerWidth: width,
          containerPadding: 0,
          boxSpacing: 12,
          targetRowHeight: 240,
        });

        imageResult.push(imageTemp.splice(0, result.boxes.length));
        results.push(result);
      }

      return {
        justify: results,
        images: imageResult,
      };
    }

    return null;
  }, [images, width]);

  const positioner = usePositioner(
    {
      width: width,
      columnGutter: windowWidth < 768 ? 8 : 12,
      columnCount: 1,
    },
    [setting.orderBy],
  );

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
  }, []);

  return (
    <main className="p-2 md:p-3" id="photo-swipe-lightbox">
      <MasonryScroller
        onRender={onLoadMore}
        positioner={positioner}
        offset={offset}
        height={windowHeight}
        containerRef={containerRef}
        items={items?.justify ?? []}
        render={({ data, index }) => {
          const itemImages = items?.images[index];
          return (
            <div
              style={{
                height: data.containerHeight + "px",
                position: "relative",
              }}
            >
              {data.boxes.map((box, i) => {
                const image = itemImages?.[i];

                return (
                  image && (
                    <a
                      href={image.src}
                      key={image.id}
                      data-pswp-width={image.width}
                      data-pswp-height={image.height}
                      data-pswp-type={
                        VIDEO_EXT.includes(image.ext) ? "video" : "image"
                      }
                      target="_blank"
                      rel="noreferrer"
                      className="relative block overflow-hidden rounded shadow"
                      style={{
                        width: `${box.width}px`,
                        height: `${box.height}px`,
                        position: "absolute",
                        top: `${box.top}px`,
                        left: `${box.left}px`,
                        backgroundColor: image.bgColor + "7F",
                      }}
                    >
                      <Image src={image.thumbnailPath} layout="fill" />
                    </a>
                  )
                );
              })}
            </div>
          );
        }}
      />
    </main>
  );
}

export default dynamic(() => Promise.resolve(Home), { ssr: false });
