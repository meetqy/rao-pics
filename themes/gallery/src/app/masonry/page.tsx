"use client";

import { useCallback, useMemo } from "react";
import dynamic from "next/dynamic";

import { VIDEO_EXT } from "@rao-pics/constant";
import type { EXT } from "@rao-pics/constant";
import { numberToHex } from "@rao-pics/utils";

import { trpc } from "~/utils/trpc";

import "photoswipe/style.css";

import { useSearchParams } from "next/navigation";
import { useRecoilValue } from "recoil";

import { settingSelector } from "~/states/setting";
import { getImageQuery } from "~/utils/get-image-query";
import ChildFolderCardList from "../_components/ChildFolderCardList";
import Masonry from "../_components/Masonry";

function Home() {
  const setting = useRecoilValue(settingSelector);
  const { data: config } = trpc.config.findUnique.useQuery();

  const search = useSearchParams();
  const m = search.get("m");

  const imageQuery = useCallback(
    () => getImageQuery(m, setting.orderBy),
    [setting.orderBy, m],
  )();

  const pages = imageQuery.data?.pages;
  const count = imageQuery.data?.pages[0]?.count;

  const images = useMemo(() => {
    if (!config) return [];

    const result = pages?.map((page) => {
      return page.data.map((image) => {
        const id = image.path.split(/\/|\\/).slice(-2)[0];
        const host = `http://${config.ip}:${config.clientPort}`;
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
  }, [config, pages]);

  const onLoadMore = async () => {
    if (imageQuery.hasNextPage) {
      await imageQuery.fetchNextPage();
    }
  };

  const ChildFolder = useCallback(() => {
    if (!m) return null;
    if (m === "trash") return null;
    if (count) return null;

    return <ChildFolderCardList folderId={m} />;
  }, [count, m]);

  return (
    <Masonry images={images} onLoadMore={onLoadMore}>
      <ChildFolder />
    </Masonry>
  );
}

export default dynamic(() => Promise.resolve(Home), { ssr: false });
