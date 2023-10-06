import { useEffect, useRef, useState } from "react";
import Image from "next/legacy/image";
import PhotoSwipeLightbox from "photoswipe/lightbox";
import type { Photo, RenderPhotoProps } from "react-photo-album";
import { PhotoAlbum } from "react-photo-album";
import { useWindowScroll } from "react-use";

import "photoswipe/style.css";

import type { EXT } from "@rao-pics/constant";
import { VIDEO_EXT } from "@rao-pics/constant";
import { numberToHex } from "@rao-pics/utils";

import initLightboxVideoPlugin from "~/utils/photoswipe-video";
import { trpc } from "~/utils/trpc";

function Home() {
  const [, setIndex] = useState(-1);
  const limit = 50;

  const imageQuery = trpc.image.find.useInfiniteQuery(
    { limit, includes: ["colors"] },
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    },
  );

  const { data: config } = trpc.config.findUnique.useQuery();
  const isFetching = useRef(false);

  // 加载更多
  const { x, y } = useWindowScroll();
  useEffect(() => {
    const h = document.body.scrollHeight - window.innerHeight;
    if (h > 0) {
      const diff = Math.abs(y - h);

      if (diff < 500) {
        if (imageQuery.hasNextPage && isFetching.current === false) {
          isFetching.current = true;
          imageQuery
            .fetchNextPage()
            .then(() => {
              setTimeout(() => {
                isFetching.current = false;
              });
            })
            .catch(console.error);
        }
      }
    }
  }, [x, y, imageQuery]);
  // 加载更多 END

  const pages = imageQuery.data?.pages;

  const id = "photo-swipe-lightbox";
  useEffect(() => {
    let lightbox: PhotoSwipeLightbox | null = new PhotoSwipeLightbox({
      gallery: "#" + id,
      children: "a.photo-swipe-lightbox-a",
      pswpModule: () => import("photoswipe"),
      loop: false,
    });

    initLightboxVideoPlugin(lightbox);

    lightbox.addFilter("placeholderSrc", (placeholderSrc, content) => {
      return content.data.msrc ?? placeholderSrc;
    });

    lightbox.init();

    return () => {
      lightbox?.destroy();
      lightbox = null;
    };
  }, [config]);

  return (
    <div
      className="pswp-gallery space-y-1 p-3 sm:px-4 md:space-y-2 lg:space-y-3 xl:space-y-4 2xl:space-y-5"
      id={id}
    >
      {pages?.map((page) => {
        const photos = page.data?.map((image) => {
          const id = image.path.split("/").slice(-2)[0];
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

        return (
          <div key={page.nextCursor ?? 1}>
            {photos && (
              <PhotoAlbum
                sizes={{
                  size: "calc(100vw - 240px)",
                  sizes: [
                    { viewport: "(max-width: 768px)", size: "100vw" },
                    { viewport: "(max-width: 1280px)", size: "50vw" },
                  ],
                }}
                layout="rows"
                photos={photos}
                breakpoints={[640, 768, 1024, 1280, 1536]}
                spacing={(containerWidth) => {
                  if (containerWidth < 640) return 12;

                  return 16;
                }}
                targetRowHeight={(containerWidth) => {
                  if (containerWidth < 640) return containerWidth / 1;
                  if (containerWidth < 768) return containerWidth / 1;
                  if (containerWidth < 1024) return containerWidth / 3;
                  if (containerWidth < 1280) return containerWidth / 4;
                  return containerWidth / 5;
                }}
                renderPhoto={NextJsImage}
                onClick={({ index }) => setIndex(index)}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

interface T extends Photo {
  thumbnailPath: string;
  id: number;
  bgColor: string;
  ext: typeof EXT;
}

function NextJsImage({
  photo,
  imageProps: { alt, title, sizes, onClick },
  wrapperStyle,
}: RenderPhotoProps<T>) {
  return (
    <a
      href={photo.src}
      data-pswp-msrc={photo.thumbnailPath}
      data-pswp-width={photo.width}
      data-pswp-height={photo.height}
      data-pswp-type={VIDEO_EXT.includes(photo.ext) ? "video" : "image"}
      key={`photo-swipe-lightbox-${photo.id}`}
      className="photo-swipe-lightbox-a select-none overflow-hidden rounded-md border shadow"
      style={{ ...wrapperStyle, position: "relative" }}
      target="_blank"
      rel="noreferrer"
    >
      <Image
        style={{ backgroundColor: photo.bgColor + "20" }}
        src={{
          src: photo.thumbnailPath,
          width: photo.width,
          height: photo.height,
        }}
        draggable={false}
        {...{ alt, title, sizes, onClick }}
      />
    </a>
  );
}

export default Home;
