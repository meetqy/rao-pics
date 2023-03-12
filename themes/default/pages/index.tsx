import { useContext, useEffect, useRef } from "react";
import { useRecoilState } from "recoil";
import { countState, LayoutContentRefContext, rightBasicState } from "@/store";
import JustifyLayout from "@/components/JustifyLayout";
import { useInfiniteScroll } from "ahooks";
import Search from "@/components/Search";
import { ArrayParam, BooleanParam, NumberParam, StringParam, useQueryParams } from "use-query-params";
import { MoreListResult, getLoadMoreList } from "@/utils/getLoadmoreList";
import { useRouter } from "next/router";

const Page = () => {
  const [counts, setCounts] = useRecoilState(countState);
  const [, setRightBasic] = useRecoilState(rightBasicState);

  const [queryParams, setQueryParams] = useQueryParams({
    ext: StringParam,
    w: ArrayParam,
    h: ArrayParam,
    k: StringParam,
    page: NumberParam,
    // 是否需要reload
    r: BooleanParam,
    s: ArrayParam,
  });

  const router = useRouter();

  const isFirstReload = useRef(true);

  const LayoutContentRef = useContext(LayoutContentRefContext);

  const infiniteScroll = useInfiniteScroll<MoreListResult>(
    (d) => {
      const page = queryParams.page || 1;
      queryParams.page = d ? page + 1 : page;

      return getLoadMoreList(queryParams);
    },
    {
      target: LayoutContentRef.current,
      threshold: 300,
      manual: true,
      isNoMore: (data) => {
        if (!data) return false;
        const { queryParams: query, pageSize, count } = data;
        const page = query.page || 1;

        setQueryParams({
          ...queryParams,
          page,
        });

        return page >= Math.ceil(count / pageSize);
      },
      onFinally: (data) => {
        if (!data) return;
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
    if (router.isReady && isFirstReload.current) {
      isFirstReload.current = false;
      infiniteScroll.reload();
    }
  }, [router.isReady, queryParams, infiniteScroll]);

  useEffect(() => {
    if (queryParams.r) {
      setQueryParams({
        ...queryParams,
        page: 1,
      });
    }
  }, [queryParams, setQueryParams]);

  useEffect(() => {
    if (queryParams.page === 1 && queryParams.r) {
      setQueryParams({
        ...queryParams,
        r: undefined,
      });

      LayoutContentRef.current?.scrollTo({ top: 0 });
      infiniteScroll.reload();
    }
  }, [queryParams, infiniteScroll, setQueryParams, LayoutContentRef]);

  if (!infiniteScroll.data) return null;

  return <JustifyLayout infiniteScroll={infiniteScroll} header={<Search />} />;
};

export default Page;
