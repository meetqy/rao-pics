import { useContext, useState } from "react";
import { useRecoilState } from "recoil";
import { countState, LayoutContentRefContext } from "@/store";
import JustifyLayout from "@/components/JustifyLayout";
import JustifyLayoutSearch from "@/components/JustifyLayout/Search";
import { useInfiniteScroll } from "ahooks";

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
    fetch(`/api/image/list?page=${page}&pageSize=${pageSize}`, {
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
  const [counts, setCounts] = useRecoilState(countState);
  const [params, setParams] = useState<Params>({
    body: {},
    page: 1,
    pageSize: 50,
  });

  const LayoutContentRef = useContext(LayoutContentRefContext);

  const infiniteScroll = useInfiniteScroll(
    (d) => getLoadMoreList(d?.params || params),
    {
      target: LayoutContentRef.current,
      isNoMore: (data) => data?.params?.page > 30,
      onFinally: (data) => {
        if (data.count != counts.all) {
          setCounts({
            ...counts,
            all: data.count,
          });
        }
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
          // onChange={(body) => {
          //   setParams((parmas) => ({
          //     ...parmas,
          //     body,
          //     page: 1,
          //   }));
          // }}
        />
      }
    />
  );
};

export default Page;
