import { useEffect, useRef, useState } from "react";
import Image from "next/legacy/image";
import PhotoSwipeLightbox from "photoswipe/lightbox";
import type { Photo, RenderPhotoProps } from "react-photo-album";
import { PhotoAlbum } from "react-photo-album";
import { useWindowScroll } from "react-use";

import "photoswipe/style.css";

import { trpc } from "~/utils/trpc";

function Home() {
  const [, setIndex] = useState(-1);
  const limit = 50;

  const imageQuery = trpc.image.get.useInfiniteQuery(
    { limit },
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    },
  );
  const { data: config } = trpc.config.get.useQuery();
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
      showHideAnimationType: "none",
    });
    lightbox.init();

    return () => {
      lightbox?.destroy();
      lightbox = null;
    };
  }, []);

  return (
    <div
      className="pswp-gallery space-y-1 md:space-y-2 lg:space-y-3 xl:space-y-4 2xl:space-y-5"
      id={id}
    >
      {pages?.map((page) => {
        const photos = page.data?.map((image) => {
          const id = image.path.split("/").slice(-2)[0];
          const src = `http://${config?.ip}:${config?.staticServerPort}/${id}/${image.name}.${image.ext}`;
          const blurDataURL = `http://${config?.ip}:${config?.staticServerPort}/blur/${id}/${image.name}.${image.ext}`;

          return {
            id: image.id,
            src,
            blurDataURL,
            width: image.width,
            height: image.height,
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
                  if (containerWidth < 640) return 4;
                  if (containerWidth < 768) return 8;
                  if (containerWidth < 1024) return 12;
                  if (containerWidth < 1280) return 16;
                  if (containerWidth < 1536) return 20;
                  return 20;
                }}
                columns={(containerWidth) => {
                  if (containerWidth < 640) return 1;
                  if (containerWidth < 768) return 2;
                  if (containerWidth < 1024) return 3;
                  if (containerWidth < 1280) return 4;
                  if (containerWidth < 1536) return 5;
                  return Math.floor(containerWidth / 240);
                }}
                targetRowHeight={(containerWidth) => {
                  if (containerWidth < 640) return containerWidth / 2;
                  if (containerWidth < 768) return containerWidth / 3;
                  if (containerWidth < 1024) return containerWidth / 4;
                  if (containerWidth < 1280) return containerWidth / 5;
                  if (containerWidth < 1536) return containerWidth / 6;
                  return containerWidth / 6;
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
  blurDataURL?: string;
  id: number;
}

function NextJsImage({
  photo,
  imageProps: { alt, title, sizes, onClick },
  wrapperStyle,
}: RenderPhotoProps<T>) {
  return (
    <a
      href={photo.src}
      data-pswp-width={photo.width}
      data-pswp-height={photo.height}
      key={`photo-swipe-lightbox-${photo.id}`}
      className="photo-swipe-lightbox-a select-none"
      style={{ ...wrapperStyle, position: "relative" }}
      target="_blank"
      rel="noreferrer"
    >
      <Image
        src={photo}
        draggable={false}
        blurDataURL={photo.blurDataURL}
        placeholder="blur"
        {...{ alt, title, sizes, onClick }}
      />
    </a>
  );
}

export default Home;
