import { useCallback, useEffect, useRef, useState } from "react";
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
  const isLoad = useRef(false);
  const [images, setImages] = useState<EagleUse.Image[]>([]);
  const [counts, setCounts] = useRecoilState(countState);
  const [params, setParams] = useState<Params>({
    body: {},
    page: 1,
    pageSize: 50,
  });
  let init = false;

  const getImageList = useCallback(() => {
    const { page, pageSize, body } = params;

    if (isLoad.current) return;
    isLoad.current = true;

    fetch(`/api/image/list?page=${page}&pageSize=${pageSize}`, {
      method: "post",
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then(({ data, count }) => {
        setImages((images) => (page === 1 ? data : images.concat(data)));
        setCounts((counts) => ({
          ...counts,
          all: count,
        }));

        isLoad.current = false;
      });
  }, [params, setCounts]);

  useEffect(() => {
    let setup = true;
    if (setup) {
      getImageList();
    }
    return () => {
      setup = false;
    };
  }, [getImageList]);

  if (!images) return null;

  return (
    <JustifyLayout
      images={images}
      isEnd={images.length === counts.all}
      isLoad={isLoad.current}
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
