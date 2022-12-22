import { activeImageState } from "@/store";
import { Button, Col, Input, Row, Tooltip } from "antd";
import { useRecoilValue } from "recoil";
import Image from "next/image";
import styles from "./basic.module.css";
import { handleImageUrl } from "@/utils";

const SiderBasic = () => {
  const image = useRecoilValue(activeImageState);

  if (!image) {
    return (
      <div style={{ padding: 20 }}>
        <Button block disabled>
          全部
        </Button>
        <Row style={{ marginTop: 20 }}>
          <Col>基本信息</Col>
        </Row>
        <div className={styles.baseInfo} style={{ marginTop: 20 }}>
          <Row align="middle">
            <Col span={8}>文件数</Col>
            <Col>111</Col>
          </Row>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: 10 }}>
      <Row justify={"center"}>
        <Col>
          <Image
            width={200}
            height={0}
            style={{
              objectFit: "contain",
              borderRadius: 8,
              width: 200,
              height: image.height / (image.width / 200),
            }}
            src={handleImageUrl(image)}
            alt={handleImageUrl(image)}
          />
        </Col>
      </Row>

      <Row
        gutter={[2, 0]}
        style={{ marginTop: 20, height: 12 }}
        className={styles.palettes}
      >
        {JSON.parse(image.palettes).map((item, i) => (
          <Col key={i} flex={1}>
            <Tooltip title={`rgb(${item.color})`}>
              <div
                style={{
                  backgroundColor: `rgb(${item.color})`,
                  height: 12,
                }}
              />
            </Tooltip>
          </Col>
        ))}
      </Row>

      <Row style={{ marginTop: 20 }}>
        <Col flex={1}>
          <Input value={image.name} disabled />
        </Col>
      </Row>
    </div>
  );
};

export default SiderBasic;
