import { countState, rightBasicState, tagsState } from "@/store";
import { Button, Col, Input, Rate, Row, Select, Tooltip } from "antd";
import { useRecoilValue } from "recoil";
import Image from "next/image";
import styles from "./basic.module.css";
import { handleImageUrl } from "@/hooks";
import { useMemo } from "react";
import { useRouter } from "next/router";

const handleTime = (time: number) => {
  const [date, t] = new Date(time)
    .toLocaleString()
    .replace(/:\d+$/, "")
    .split(" ");

  return (
    date
      .split("/")
      .map((item) => (item.length === 1 ? "0" + item : item))
      .join("/") +
    " " +
    t
  );
};

const SiderBasic = () => {
  const rightBasic = useRecoilValue(rightBasicState);
  const image = useMemo(() => rightBasic.image, [rightBasic]);
  const tags = useRecoilValue(tagsState);
  const counts = useRecoilValue(countState);
  const router = useRouter();

  const fileNumber = useMemo(() => {
    return counts[
      router.pathname === "/" ? "all" : router.pathname.replace("/", "")
    ];
  }, [counts]);

  const names = {
    "/": "全部",
    "/not-tag": "未标签",
    "/tags": "标签管理",
    "/recycle": "回收站",
  };

  if (!image) {
    return (
      <div style={{ padding: 20 }}>
        <Button block disabled>
          {names[router.pathname]}
        </Button>
        <Row style={{ marginTop: 20 }}>
          <Col>基本信息</Col>
        </Row>
        <div className={styles.baseInfo} style={{ marginTop: 20 }}>
          <Row align="middle">
            <Col span={8}>文件数</Col>
            <Col>{fileNumber}</Col>
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
        {JSON.parse(image.palettes)
          .slice(0, 8)
          .map((item, i) => (
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

      <Row style={{ marginTop: 10 }}>
        <Col flex={1}>
          <Select
            mode="multiple"
            placeholder="暂无标签"
            style={{ width: "100%" }}
            disabled
            value={image?.tags ? image.tags.map((item) => item.id) : []}
            options={tags.map((item) => ({ label: item.id, value: item.id }))}
          />
        </Col>
      </Row>

      <Row style={{ marginTop: 10 }}>
        <Col flex={1}>
          <Input value={image.annotation} disabled placeholder="暂无注释" />
        </Col>
      </Row>

      <Row style={{ marginTop: 10 }}>
        <Col flex={1}>
          <Input value={image.url} disabled placeholder="暂无链接" />
        </Col>
      </Row>

      <div style={{ marginTop: 20 }}>
        <Row>
          <Col>基本信息</Col>
        </Row>

        <Row align="middle" style={{ marginTop: 10 }}>
          <Col span={8}>评分</Col>
          <Col>
            <Rate value={image.star || 0} disabled />
          </Col>
        </Row>
        <Row align="middle" style={{ marginTop: 10 }}>
          <Col span={8}>尺寸</Col>
          <Col>
            {image.width} x {image.height}
          </Col>
        </Row>
        <Row align="middle" style={{ marginTop: 10 }}>
          <Col span={8}>文件大小</Col>
          <Col>{(image.size / 1024).toFixed(2)} KB</Col>
        </Row>
        <Row align="middle" style={{ marginTop: 10 }}>
          <Col span={8}>格式</Col>
          <Col>{image.ext.toLocaleUpperCase()}</Col>
        </Row>
        <Row align="middle" style={{ marginTop: 10 }}>
          <Col span={8}>添加日期</Col>
          <Col>{handleTime(image.mtime)}</Col>
        </Row>
        <Row align="middle" style={{ marginTop: 10 }}>
          <Col span={8}>创建日期</Col>
          <Col>{handleTime(image.btime)}</Col>
        </Row>
        <Row align="middle" style={{ marginTop: 10 }}>
          <Col span={8}>修改日期</Col>
          <Col>{handleTime(image.lastModified)}</Col>
        </Row>

        <Row style={{ marginTop: 20 }}>
          <Col flex={1}>
            <Button
              block
              type="primary"
              onClick={() => {
                open(handleImageUrl(image, true));
              }}
            >
              查看原图
            </Button>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default SiderBasic;
