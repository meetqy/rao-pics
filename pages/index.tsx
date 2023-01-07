import { useEffect, useMemo, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import { countState, rightBasicState } from "@/store";
import JustifyLayout from "@/components/JustifyLayout";
import JustifyLayoutSearch from "@/components/JustifyLayout/Search";
import { useRouter } from "next/router";

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
  const [_rightBasic, setRightBasic] = useRecoilState(rightBasicState);

  const router = useRouter();
  const tag = useMemo(() => router.query.tag as string, [router]);

  useEffect(() => {
    if (tag) {
      setParams((params) => ({
        ...params,
        body: {
          tags: [tag],
        },
      }));
    }
  }, [tag]);

  useEffect(() => {
    const { page, pageSize, body } = params;
    if (!params.body.tags && tag) return;
    if (isLoad.current) return;
    isLoad.current = true;

    fetch(`/api/image/list?page=${page}&pageSize=${pageSize}`, {
      method: "post",
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then(({ data, count, size }) => {
        setImages((images) => (page === 1 ? data : images.concat(data)));
        setCounts((counts) => ({
          ...counts,
          all: count,
        }));
        setRightBasic((rightBasic) => ({
          ...rightBasic,
          fileSize: size,
        }));

        isLoad.current = false;
      });
  }, [params, setCounts, tag, setRightBasic]);

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
            setParams((parmas) => ({
              ...parmas,
              body,
              page: 1,
            }));
          }}
        />
      }
    />
  );
};

export default Page;
