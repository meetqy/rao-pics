import { useRef, useState } from "react";
import { useRecoilState } from "recoil";
import { countState } from "@/store";
import JustifyLayout from "@/components/JustifyLayout";
import JustifyLayoutSearch from "@/components/JustifyLayout/Search";
import { useRequest } from "ahooks";

interface Params {
  body: EagleUse.SearchParams;
  page: number;
  pageSize: number;
}

const Page = () => {
  const [images, setImages] = useState<EagleUse.Image[]>([]);
  const [counts, setCounts] = useRecoilState(countState);
  const isLoad = useRef(false);
  const [params, setParams] = useState<Params>({
    body: {},
    page: 1,
    pageSize: 50,
  });

  const getImageList = (
    _params: Params
  ): Promise<{
    data: EagleUse.Image[];
    count: number;
  } | null> => {
    return new Promise((resolve) => {
      if (isLoad.current) return resolve(null);

      isLoad.current = true;
      fetch(
        `/api/image/list?page=${_params.page}&pageSize=${_params.pageSize}`,
        {
          method: "post",
          body: JSON.stringify(_params.body),
        }
      )
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
          resolve({
            data,
            count,
          });
        });
    });
  };

  const { run } = useRequest(getImageList, {
    debounceWait: 300,
    manual: true,
  });

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
            run({
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
