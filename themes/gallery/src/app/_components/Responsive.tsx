"use client";

import { useMemo, useRef } from "react";
import Image from "next/legacy/image";
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

import initLightboxVideoPlugin from "~/utils/photoswipe-video";

import "photoswipe/style.css";

import { useWindowSize } from "~/hooks/useWindowSize";

type JustifyLayoutResult = ReturnType<typeof justifyLayout>;

interface Props {
  images?: {
    id: number;
    src: string;
    thumbnailPath: string;
    bgColor: string;
    width: number;
    height: number;
    ext: typeof EXT;
    type: string;
    msrc: string;
  }[];

  onLoadMore: () => void;

  children?: React.ReactNode;
}

function Responsive({ children, images, onLoadMore }: Props) {
  const limit = 50;
  const containerRef = useRef(null);
  const [windowWidth, windowHeight] = useWindowSize();

  const { offset, width } = useContainerPosition(containerRef, [
    windowWidth,
    windowHeight,
  ]);

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
    [images],
  );

  const onRender = useInfiniteLoader(onLoadMore, {
    minimumBatchSize: limit,
    threshold: 3,
  });

  const lightbox: PhotoSwipeLightbox | null = new PhotoSwipeLightbox({
    pswpModule: () => import("photoswipe"),
    loop: false,
  });

  initLightboxVideoPlugin(lightbox);
  lightbox.init();

  return (
    <main className="p-2 md:p-3" id="photo-swipe-lightbox">
      <MasonryScroller
        onRender={onRender}
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
                      className="relative block overflow-hidden rounded-box shadow"
                      style={{
                        width: `${box.width}px`,
                        height: `${box.height}px`,
                        position: "absolute",
                        top: `${box.top}px`,
                        left: `${box.left}px`,
                        backgroundColor: image.bgColor + "0C",
                      }}
                      onClick={(e) => {
                        e.preventDefault();

                        const curIndex = images?.findIndex(
                          (item) => item.id === image.id,
                        );

                        lightbox.loadAndOpen(curIndex ?? 0, images ?? []);
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

      {children}
    </main>
  );
}

export default Responsive;
