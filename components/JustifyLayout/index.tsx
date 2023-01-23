import Image from "next/image";
import justifyLayout from "justified-layout";
import { Button, Card, Layout, Row, Col, theme, Empty } from "antd";
import { useEffect, useMemo, useState } from "react";
import { handleImageAlt, handleImageUrl } from "@/hooks";
import { useRecoilState } from "recoil";
import { rightBasicState } from "@/store";

interface LayoutBox {
  aspectRatio: number;
  top: number;
  width: number;
  height: number;
  left: number;
  forcedAspectRatio?: boolean;
}

interface JustifiedLayoutResult {
  containerHeight: number;
  widowCount: number;
  boxes: LayoutBox[];
}

interface TData {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  list: any[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

interface Props {
  header?: JSX.Element;
  // https://ahooks.js.org/zh-CN/hooks/use-infinite-scroll/#options
  infiniteScroll: {
    data: TData | undefined;
    loading: boolean;
    loadingMore: boolean;
    noMore: boolean;
    loadMore: () => void;
    loadMoreAsync: () => Promise<TData>;
    reload: () => void;
    reloadAsync: () => Promise<TData>;
    mutate: import("react").Dispatch<
      import("react").SetStateAction<TData | undefined>
    >;
    cancel: () => void;
  };
}

const JustifyLayout = ({ infiniteScroll, header }: Props) => {
  const [layoutPos, setLayoutPos] = useState<JustifiedLayoutResult>();
  const [rightBasic, setRightBasic] = useRecoilState(rightBasicState);
  const { token } = theme.useToken();
  const activeImage = useMemo(() => rightBasic.image, [rightBasic]);
  const { data, loadMore, loadingMore, noMore } = infiniteScroll;
  const images = useMemo(() => data.list, [data.list]);

  useEffect(() => {
    setLayoutPos(
      justifyLayout([...images], {
        containerWidth: document.body.clientWidth - 490,
        targetRowHeight: 200,
        boxSpacing: {
          horizontal: 15,
          vertical: 20,
        },
      })
    );
  }, [images]);

  const loadmore = () => {
    if (images.length < 1) return <Empty />;

    if (noMore) return <Button type="text">没有更多数据</Button>;

    return (
      <Button type="link" disabled={loadingMore} onClick={loadMore}>
        {loadingMore ? "加载中..." : "加载更多"}
      </Button>
    );
  };

  if (!layoutPos) return null;

  return (
    <Layout>
      {header}
      <Layout.Content style={{ position: "relative", paddingLeft: 5 }}>
        <div
          style={{
            height: layoutPos.containerHeight,
          }}
        >
          {layoutPos.boxes.map((item, i: number) => {
            const image = images[i];
            if (!image) return null;
            const palettes: EagleUse.ImagePalette = JSON.parse(image.palettes);

            return (
              <Card
                hoverable
                key={image.id}
                style={{
                  ...item,
                  position: "absolute",
                  background: `rgb(${palettes[0].color}, .25)`,
                  overflow: "hidden",
                  outline:
                    activeImage?.id === image.id
                      ? `4px solid ${token.colorPrimary}`
                      : "",
                }}
                bordered={false}
                bodyStyle={{ padding: 0, ...item }}
                onClick={() => {
                  setRightBasic({
                    ...rightBasic,
                    image,
                  });
                }}
              >
                <Image
                  width={item.width}
                  height={item.height}
                  src={handleImageUrl(image)}
                  alt={handleImageAlt(image)}
                />
              </Card>
            );
          })}
        </div>

        <Row style={{ paddingBottom: 20 }} justify="center">
          <Col>{loadmore()}</Col>
        </Row>
      </Layout.Content>
    </Layout>
  );
};

export default JustifyLayout;
