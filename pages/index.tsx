import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { countState } from "@/store";
import JustifyLayout from "@/components/JustifyLayout";

const Page = () => {
  const [images, setImages] = useState<EagleUse.Image[]>([]);
  const pageSize = 50;
  const [page, setPage] = useState(1);
  const [isLoad, setIsLoad] = useState<boolean>(false);
  const [counts, setCounts] = useRecoilState(countState);

  const getImageList = () => {
    fetch(`/api/image/list?page=${page}&pageSize=${pageSize}`, {
      method: "post",
    })
      .then((res) => res.json())
      .then(({ data, count }) => {
        setImages(page === 1 ? data : images.concat(data));
        setCounts({
          ...counts,
          all: count,
        });

        setIsLoad(false);
      });
  };

  useEffect(() => {
    getImageList();
  }, [page]);

  if (!images) return null;

  return (
    <JustifyLayout
      images={images}
      isLoad={isLoad}
      isEnd={images.length === counts["all"]}
      onLoadmore={() => {
        setPage(page + 1);
        setIsLoad(true);
      }}
    />
  );
};

export default Page;
