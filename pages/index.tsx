import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { countState } from "@/store";
import JustifyLayout from "@/components/JustifyLayout";
import JustifyLayoutSearch from "@/components/JustifyLayout/Search";

const Page = () => {
  const [images, setImages] = useState<EagleUse.Image[]>([]);
  const [isLoad, setIsLoad] = useState<boolean>(false);
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
    setIsLoad(true);
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

        setIsLoad(false);
      });
  };

  useEffect(() => getImageList, [params]);

  if (!images) return null;

  return (
    <JustifyLayout
      images={images}
      isLoad={isLoad}
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
