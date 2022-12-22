import Image from "next/image";
import justifyLayout from "justified-layout";
import { Button, Card, Layout, Row, Col } from "antd";
import { useEffect, useState } from "react";
import { handleImageUrl } from "@/utils";
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

const Page = () => {
  const [images, setImages] = useState<EagleUse.Image[]>([]);
  const pageSize = 50;
  const [page, setPage] = useState(1);
  const [isLoad, setIsLoad] = useState<boolean>(false);
  const [layoutPos, setLayoutPos] = useState<JustifiedLayoutResult>();
  const [_activeImage, setActiveImage] = useRecoilState(activeImageState);

  useEffect(() => {
    getImageList();
  }, []);

  useEffect(() => {
    setLayoutPos(
      justifyLayout([...images], {
        containerWidth: document.body.clientWidth - 490,
        targetRowHeight: 260,
        boxSpacing: {
          horizontal: 10,
          vertical: 20,
        },
      })
    );
  }, [images]);

  const getImageList = () => {
    fetch(`/api/image/list?page=${page}&pageSize=${pageSize}`, {
      method: "post",
    })
      .then((res) => res.json())
      .then((res) => {
        setImages(page === 1 ? res.data : images.concat(res.data));
        setIsLoad(false);
      });
  };

  useEffect(() => {
    getImageList();
  }, [page]);

  const loadmore = () => {
    return (
      <Button
        type="link"
        disabled={isLoad}
        onClick={() => {
          setIsLoad(true);
          setPage(page + 1);
        }}
      >
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
        paddingLeft: 5,
      }}
    >
      <Layout.Content style={{ position: "relative" }}>
        <div
          style={{
            height: layoutPos.containerHeight,
          }}
        >
          {layoutPos.boxes.map((item, i: number) => {
            const image = images[i];
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
                }}
                bodyStyle={{ padding: 0, ...item }}
                onClick={() => {
                  setActiveImage(image);
                }}
              >
                <Image
                  priority
                  width={item.width}
                  height={item.height}
                  src={handleImageUrl(image)}
                  alt={handleImageUrl(image)}
                  style={{
                    width: "100%",
                    height: "100%",
                  }}
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

export default Page;
