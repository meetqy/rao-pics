import { useCallback, useEffect, useRef, useState } from "react";
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
    pageSize: 50,
    page: 1,
  });

  const isLoad = useRef(false);
  const [counts, setCounts] = useRecoilState(countState);

  const getImageList = useCallback(() => {
    const { page, pageSize } = params;
    if (isLoad.current) return;

    isLoad.current = true;

    fetch(`/api/image/not-tag?page=${page}&pageSize=${pageSize}`, {
      method: "post",
    })
      .then((res) => res.json())
      .then(({ data, count }) => {
        setImages((images) => (page === 1 ? data : images.concat(data)));
        setCounts((counts) => ({
          ...counts,
          "not-tag": count,
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
      isLoad={isLoad.current}
      isEnd={images.length === counts["not-tag"]}
      onLoadmore={() => {
        setParams({
          ...params,
          page: params.page + 1,
        });
      }}
    />
  );
};

export default Page;
