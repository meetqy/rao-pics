import Image from "next/image";
import justifyLayout from "justified-layout";
import { Button, Card, Layout, Row, Col, theme } from "antd";
import { useEffect, useState } from "react";
import { handleImageUrl } from "@/hooks";
import { useRecoilState } from "recoil";
import { activeImageState } from "@/store";

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

interface Props {
  images: EagleUse.Image[];
  onLoadmore: () => void;
  isLoad: boolean;
  isEnd?: boolean;
  header?: JSX.Element;
}

const JustifyLayout = ({
  images,
  onLoadmore,
  isLoad,
  isEnd,
  header,
}: Props) => {
  const [layoutPos, setLayoutPos] = useState<JustifiedLayoutResult>();
  const [activeImage, setActiveImage] = useRecoilState(activeImageState);
  const { token } = theme.useToken();

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
    if (isEnd) return null;

    return (
      <Button type="link" disabled={isLoad} onClick={onLoadmore}>
        加载更多
      </Button>
    );
  };

  if (!layoutPos) return null;

  return (
    <Layout
      className="scroll-bar"
      style={{
        overflowY: "scroll",
        overflowX: "hidden",
        height: "100%",
      }}
    >
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
                  setActiveImage(image);
                }}
              >
                <Image
                  width={item.width}
                  height={item.height}
                  src={handleImageUrl(image)}
                  alt={handleImageUrl(image)}
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
