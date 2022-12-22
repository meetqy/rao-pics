import { MyLayout } from "@/components/Layout";
import Image from "next/image";
import justifyLayout from "justified-layout";
import { Card, Layout } from "antd";
import { ReactElement, useEffect, useMemo, useState } from "react";
import { handleImageUrl } from "@/utils";

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
  const [layoutPos, setLayoutPos] = useState<JustifiedLayoutResult>();

  useEffect(() => {
    getImageList();
  }, []);

  useEffect(() => {
    setLayoutPos(
      justifyLayout([...images], {
        containerWidth: document.body.clientWidth - 480,
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
        setImages(images.concat(res.data));
      });
  };

  if (!layoutPos) return null;

  return (
    <Layout
      style={{ overflowY: "scroll", overflowX: "hidden", height: "100%" }}
    >
      <Layout.Content style={{ position: "relative" }}>
        <div
          style={{
            height: layoutPos.containerHeight,
          }}
        >
          {layoutPos.boxes.map((item, i: number) => {
            const image = images[i];

            return (
              <Card
                hoverable
                key={image.id}
                style={{
                  ...item,
                  position: "absolute",
                  background: `rgb(${image.palettes[0].color}, .25)`,
                  overflow: "hidden",
                }}
                bodyStyle={{ padding: 0, ...item }}
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
      </Layout.Content>
    </Layout>
  );
};

export default Page;
