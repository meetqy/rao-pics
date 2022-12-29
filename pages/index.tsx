import { useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import { countState } from "@/store";
import JustifyLayout from "@/components/JustifyLayout";
import JustifyLayoutSearch from "@/components/JustifyLayout/Search";
import { useRouter } from "next/router";
import _ from "lodash";

interface Params {
  body: EagleUse.SearchParams;
  page: number;
  pageSize: number;
}

const Page = () => {
  const router = useRouter();

  const [images, setImages] = useState<EagleUse.Image[]>([]);
  const [counts, setCounts] = useRecoilState(countState);
  const isLoad = useRef(false);
  const [params, setParams] = useState<Params>({
    body: {
      tags: [],
    },
    page: 1,
    pageSize: 50,
  });

  const getImageList = (_params: Params) => {
    if (isLoad.current) return;

    isLoad.current = true;
    fetch(`/api/image/list?page=${_params.page}&pageSize=${_params.pageSize}`, {
      method: "post",
      body: JSON.stringify(_params.body),
    })
      .then((res) => res.json())
      .then(({ data, count }) => {
        setImages(_params.page === 1 ? data : images.concat(data));
        setCounts((cur) => {
          return {
            ...cur,
            all: count,
          };
        });
        setParams(_params);
        isLoad.current = false;
      });
  };

  useEffect(() => {
    const tag = router.query.tag ? [router.query.tag as string] : [];

    // 标签管理跳转到按标签搜索，通过router.query判断tag
    const newParams = {
      ...params,
      body: {
        ...params.body,
        tags: tag,
      },
    };

    if (_.isEqual(newParams, params)) return;

    getImageList(newParams);
  }, [router.query]);

  useEffect(() => {
    getImageList(params);
    return () => {
      params.body.tags = [];
      params.page = 1;
    };
  }, []);

  if (!images) return null;

  return (
    <JustifyLayout
      images={images}
      isEnd={images.length === counts.all}
      isLoad={isLoad.current}
      onLoadmore={() => {
        getImageList({
          ...params,
          page: params.page + 1,
        });
      }}
      header={
        <JustifyLayoutSearch
          params={params.body}
          count={counts.all}
          onChange={(body) => {
            getImageList({
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
