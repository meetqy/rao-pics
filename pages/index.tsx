import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { countState } from "@/store";
import JustifyLayout from "@/components/JustifyLayout";
import JustifyLayoutSearch from "@/components/JustifyLayout/Search";

const Page = () => {
  const [images, setImages] = useState<EagleUse.Image[]>([]);
  const pageSize = 50;
  const [page, setPage] = useState(1);
  const [isLoad, setIsLoad] = useState<boolean>(false);
  const [counts, setCounts] = useRecoilState(countState);
  const [params, setParams] = useState(undefined);

  const getImageList = () => {
    fetch(`/api/image/list?page=${page}&pageSize=${pageSize}`, {
      method: "post",
      body: JSON.stringify(params),
    })
      .then((res) => res.json())
      .then(({ data, count }) => {
        setImages(page === 1 ? data : images.concat(data));
        if (!params) {
          setCounts({
            ...counts,
            all: count,
          });
        }

        setIsLoad(false);
      });
  };

  useEffect(() => {
    getImageList();
  }, [page, params]);

  if (!images) return null;

  console.log(counts);

  return (
    <JustifyLayout
      images={images}
      isLoad={isLoad}
      isEnd={images.length === counts["all"]}
      onLoadmore={() => {
        setPage(page + 1);
        setIsLoad(true);
      }}
      header={
        <JustifyLayoutSearch
          count={counts.all}
          onChange={(params) => {
            setParams(params);
            setPage(1);
          }}
        />
      }
    />
  );
};

export default Page;
