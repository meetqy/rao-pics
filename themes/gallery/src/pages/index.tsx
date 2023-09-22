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
          const src = `http://${config?.ip}:${config?.serverPort}/static/${id}/${image.name}.${image.ext}`;
          const blurDataURL = `http://${config?.ip}:${config?.serverPort}/static/blur/${id}/${image.name}.${image.ext}`;

          return {
            id: image.id,
            src,
            blurDataURL: image.blurDataURL ?? blurDataURL,
            width: image.width,
            height: image.height,
            // srcset: [
            //   16, 32, 48, 64, 96, 128, 256, 384, 640, 750, 828, 1080, 1200,
            //   1920, 2048, 3840,
            // ]
            //   .map((size) => `/_next/image?url=${src}?w=${size}&q=75`)
            //   .join(", "),
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
      // data-src-set={photo.srcSet}
      key={`photo-swipe-lightbox-${photo.id}`}
      className="photo-swipe-lightbox-a select-none overflow-hidden rounded-md border shadow"
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
