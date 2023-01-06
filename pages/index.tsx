import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { countState } from "@/store";
import JustifyLayout from "@/components/JustifyLayout";
import JustifyLayoutSearch from "@/components/JustifyLayout/Search";

interface Params {
  body: EagleUse.SearchParams;
  page: number;
  pageSize: number;
}

const Page = () => {
  const [isLoad, setIsLoad] = useState(false);
  const [images, setImages] = useState<EagleUse.Image[]>([]);
  const [counts, setCounts] = useRecoilState(countState);
  const [params, setParams] = useState<Params>({
    body: {},
    page: 1,
    pageSize: 50,
  });
  let init = false;

  const getImageList = (_params: Params) => {
    if (isLoad) return;

    setIsLoad(true);
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
        setIsLoad(false);
      });
  };

  useEffect(() => {
    if (init) return;
    init = true;
    getImageList(params);
  }, []);

  if (!images) return null;

  return (
    <JustifyLayout
      images={images}
      isEnd={images.length === counts.all}
      isLoad={isLoad}
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
