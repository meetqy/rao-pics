import { useContext, useState } from "react";
import { useRecoilState } from "recoil";
import { countState, LayoutContentRefContext, rightBasicState } from "@/store";
import JustifyLayout from "@/components/JustifyLayout";
import JustifyLayoutSearch from "@/components/JustifyLayout/Search";
import { useInfiniteScroll } from "ahooks";
import { useRouter } from "next/router";

interface Params {
  body: EagleUse.SearchParams;
  page: number;
  pageSize: number;
}

interface Result {
  list: EagleUse.Image[];
  params: Params;
  count: number;
  size: number;
}

function getLoadMoreList(params: Params): Promise<Result> {
  const { page, pageSize, body } = params;

  return new Promise((resolve) => {
    fetch(`/api/image?page=${page}&pageSize=${pageSize}`, {
      method: "post",
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then(({ data, count, size }) => {
        resolve({
          list: data,
          params: {
            ...params,
            page: page + 1,
          },
          count,
          size,
        });
      });
  });
}

const Page = () => {
  const router = useRouter();
  const [counts, setCounts] = useRecoilState(countState);
  const [, setRightBasic] = useRecoilState(rightBasicState);
  const { tag } = router.query;
  const [params] = useState<Params>({
    body: {
      tags: tag ? [tag as string] : [],
    },
    page: 1,
    pageSize: 50,
  });

  const LayoutContentRef = useContext(LayoutContentRefContext);

  const infiniteScroll = useInfiniteScroll(
    (d) => getLoadMoreList(d?.params || params),
    {
      target: LayoutContentRef.current,
      threshold: 300,
      isNoMore: (data) => {
        if (!data) return false;
        const { params, count } = data;
        return params.page >= Math.ceil(count / params.pageSize);
      },
      onFinally: (data) => {
        if (data.count != counts.all) {
          setCounts({
            ...counts,
            all: data.count,
          });
        }

        setRightBasic((rightBasic) => ({ ...rightBasic, fileSize: data.size }));
      },
    }
  );

  if (!infiniteScroll.data) return null;

  return (
    <JustifyLayout
      infiniteScroll={infiniteScroll}
      header={
        <JustifyLayoutSearch
          params={params.body}
          count={counts.all}
          onChange={(body) => {
            params.body = body;
            infiniteScroll.reload();
          }}
        />
      }
    />
  );
};

export default Page;
