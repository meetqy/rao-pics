import { useContext, useState } from "react";
import { useRecoilState } from "recoil";
import { countState, LayoutContentRefContext, rightBasicState } from "@/store";
import JustifyLayout from "@/components/JustifyLayout";
import { useInfiniteScroll } from "ahooks";

interface Params {
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
  const { page, pageSize } = params;

  return new Promise((resolve) => {
    fetch(`/api/image/list?page=${page}&pageSize=${pageSize}`, {
      method: "post",
      body: JSON.stringify({
        noTags: true,
      }),
    })
      .then((res) => res.json())
      .then(({ data, count, size }) => {
        resolve({
          list: data,
          count,
          size,
          params: {
            ...params,
            page: page + 1,
          },
        });
      });
  });
}

const Page = () => {
  const [params] = useState<Params>({
    pageSize: 50,
    page: 1,
  });

  const [rightBasic, setRightBasic] = useRecoilState(rightBasicState);
  const [counts, setCounts] = useRecoilState(countState);

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
            "not-tag": data.count,
          });
        }

        if (rightBasic.fileSize != data.size) {
          setRightBasic((rightBasic) => ({
            ...rightBasic,
            fileSize: data.size,
          }));
        }
      },
    }
  );

  if (!infiniteScroll.data) return null;

  return <JustifyLayout infiniteScroll={infiniteScroll} />;
};

export default Page;
