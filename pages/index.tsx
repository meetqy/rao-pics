import { useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import { countState } from "@/store";
import JustifyLayout from "@/components/JustifyLayout";
import JustifyLayoutSearch from "@/components/JustifyLayout/Search";
import { useRouter } from "next/router";
import _ from "lodash";

const Page = () => {
  const router = useRouter();

  const [images, setImages] = useState<EagleUse.Image[]>([]);
  const isLoad = useRef<boolean>(false);
  const [counts, setCounts] = useRecoilState(countState);
  const [params, setParams] = useState<{
    body: {
      tags: string[];
    };
    page: number;
    pageSize: number;
  }>({
    body: {
      tags: [],
    },
    page: 1,
    pageSize: 50,
  });

  const getImageList = () => {
    isLoad.current = true;
    fetch(`/api/image/list?page=${params.page}&pageSize=${params.pageSize}`, {
      method: "post",
      body: JSON.stringify(params.body),
    })
      .then((res) => res.json())
      .then(({ data, count }) => {
        setImages(params.page === 1 ? data : images.concat(data));
        setCounts({
          ...counts,
          all: count,
        });
        isLoad.current = false;
      });
  };

  useEffect(() => {
    const tag = router.query.tag ? [router.query.tag as string] : [];
    if (!_.isEqual(params.body.tags, tag)) {
      return setParams({
        ...params,
        body: {
          ...params.body,
          tags: tag,
        },
      });
    }

    if (!isLoad.current) {
      getImageList();
    }
  }, [params, router.query]);

  if (!images) return null;

  return (
    <JustifyLayout
      images={images}
      isLoad={isLoad.current}
      isEnd={images.length === counts["all"]}
      onLoadmore={() => {
        setParams({
          ...params,
          page: params.page + 1,
        });
      }}
      header={
        <JustifyLayoutSearch
          params={params.body}
          count={counts.all}
          onChange={(body) => {
            setParams({
              ...params,
              body,
              page: 1,
            });
          }}
        />
      }
    />
  );
};

export default Page;
