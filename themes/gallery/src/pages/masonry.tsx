import { useMemo, useRef } from "react";
import dynamic from "next/dynamic";
import Image from "next/legacy/image";
import { useWindowSize } from "@react-hook/window-size";
import {
  MasonryScroller,
  useContainerPosition,
  useInfiniteLoader,
  usePositioner,
} from "masonic";

import type { EXT } from "@rao-pics/constant";
import { numberToHex } from "@rao-pics/utils";

import { trpc } from "~/utils/trpc";

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

  const cardWidth = useRef<number>();
  const [windowWidth, windowHeight] = useWindowSize();
  if (windowWidth >= 1920 && !cardWidth.current) {
    cardWidth.current = 240;
  }

  const { offset, width } = useContainerPosition(containerRef, [
    windowWidth,
    windowHeight,
  ]);

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

  return (
    <main className="p-2 md:p-3">
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
            <div
              className="relative rounded"
              style={{
                backgroundColor: data.bgColor + "7F",
                height: h,
              }}
            >
              <Image
                src={data.thumbnailPath}
                layout="fill"
                className="rounded"
              />
            </div>
          );
        }}
      />
    </main>
  );
}

export default dynamic(() => Promise.resolve(Home), { ssr: false });
