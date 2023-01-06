import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { countState } from "@/store";
import JustifyLayout from "@/components/JustifyLayout";

interface Params {
  page: number;
  pageSize: number;
}

const Page = () => {
  const [images, setImages] = useState<EagleUse.Image[]>([]);
  const [params, setParams] = useState<Params>({
    page: 1,
    pageSize: 50,
  });
  const [isLoad, setIsLoad] = useState<boolean>(false);
  const [counts, setCounts] = useRecoilState(countState);
  let isInit = false;

  const getImageList = (params: Params) => {
    const { page, pageSize } = params;
    if (isLoad) return;

    setIsLoad(true);
    fetch(`/api/image/recycle?page=${page}&pageSize=${pageSize}`, {
      method: "post",
    })
      .then((res) => res.json())
      .then(({ data, count }) => {
        setImages(page === 1 ? data : images.concat(data));
        setCounts({
          ...counts,
          recycle: count,
        });

        setParams(params);
        setIsLoad(false);
      });
  };

  useEffect(() => {
    if (isInit) return;
    isInit = true;

    getImageList(params);
  }, []);

  if (!images) return null;

  return (
    <JustifyLayout
      images={images}
      isLoad={isLoad}
      isEnd={images.length === counts.recycle}
      onLoadmore={() => {
        getImageList({
          ...params,
          page: params.page + 1,
        });
      }}
    />
  );
};

export default Page;
