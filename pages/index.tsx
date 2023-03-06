import { useContext, useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import {
  countState,
  LayoutContentRefContext,
  rightBasicState,
  searchParamState,
} from "@/store";
import JustifyLayout from "@/components/JustifyLayout";
import JustifyLayoutSearch from "@/components/JustifyLayout/Search";
import { useInfiniteScroll } from "ahooks";
import _ from "lodash";
import { handleOrderBy, handleSize } from "@/hooks/prismaInput";

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
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        where: {
          AND: [
            handleSize({ size: body.size }),
            !_.isEmpty(body.tags)
              ? { tags: { some: { id: { in: body.tags } } } }
              : undefined,
            // 注释
            { annotation: { contains: body.annotation } },
            // 扩展名
            { ext: body.ext || undefined },
            // 评级
            { star: body.star || undefined },
            // 删除 回收站
            { isDeleted: false },
          ],
        },
        include: { tags: true },
        orderBy: handleOrderBy({ orderBy: body.orderBy }),
      }),
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
  const [, setRightBasic] = useRecoilState(rightBasicState);
  const [searchParams, setSearchParams] = useRecoilState(searchParamState);
  const [params] = useState<Params>({
    body: {},
    page: 1,
    pageSize: 50,
  });

  const LayoutContentRef = useContext(LayoutContentRefContext);

  const infiniteScroll = useInfiniteScroll(
    (d) => getLoadMoreList(d?.params || params),
    {
      target: LayoutContentRef.current,
      threshold: 300,
      manual: false,
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

  useEffect(() => {
    if (_.isEqual(params.body, searchParams)) return;

    params.body = searchParams;
    setTimeout(() => infiniteScroll.reload());
  }, [searchParams, params, infiniteScroll]);

  if (!infiniteScroll.data) return null;

  return (
    <JustifyLayout
      infiniteScroll={infiniteScroll}
      header={
        <JustifyLayoutSearch
          params={params.body}
          count={counts.all}
          onChange={(body) => {
            setSearchParams({
              ...body,
            });
          }}
        />
      }
    />
  );
};

export default Page;
