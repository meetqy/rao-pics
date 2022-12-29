import { CaretDownOutlined } from "@ant-design/icons";
import { Col, InputNumber, Popover, Row, Typography } from "antd";
import { useMemo, useState } from "react";
import { SearchModuleParams } from "../types";

interface Props {
  onChange?: (value: SearchModuleParams["size"]) => void;
}

const Size = (props: Props) => {
  const [value, setValue] = useState<SearchModuleParams["size"]>({
    width: {
      min: 0,
      max: 0,
    },
    height: {
      min: 0,
      max: 0,
    },
  });

  const changeValue = (
    e: number,
    size: "width" | "height",
    type: "min" | "max"
  ) => {
    value[size][type] = e;
    setValue({
      ...value,
    });

    props?.onChange(value);
  };

  const text = useMemo(() => {
    const { width, height } = value;
    let w = "";
    let h = "";
    if (width.min && width.max) {
      w = `${width.min}≤宽≤${width.max}`;
    } else if (width.min && !width.max) {
      w = `宽≥${width.min}`;
    } else if (width.max && !width.min) {
      w = `宽≤${width.max}`;
    }

    if (height.min && height.max) {
      h = `${height.min}≤高≤${height.max}`;
    } else if (height.min && !height.max) {
      h = `高≥${height.min}`;
    } else if (height.max && !height.min) {
      h = `高≤${height.max}`;
    }

    let t = w + ", " + h;
    t = t.replace(/(,\s)$/, "").replace(/^(,\s)/, "");

    return t || "尺寸";
  }, [value]);

  return (
    <Popover
      placement="bottom"
      trigger={"click"}
      content={
        <>
          <Row gutter={[40, 0]} align="middle">
            <Col>宽</Col>
            <Col>
              <InputNumber
                value={value.width.min}
                onChange={(e) => changeValue(e, "width", "min")}
                placeholder="最小"
                size="small"
                min={0}
              />
              <span> - </span>
              <InputNumber
                value={value.width.max}
                onChange={(e) => changeValue(e, "width", "max")}
                placeholder="最大"
                size="small"
                min={0}
              />
            </Col>
          </Row>
          <Row gutter={[40, 0]} align="middle" style={{ marginTop: 20 }}>
            <Col>高</Col>
            <Col>
              <InputNumber
                value={value.height.min}
                onChange={(e) => changeValue(e, "height", "min")}
                placeholder="最小"
                size="small"
                min={0}
              />
              <span> - </span>
              <InputNumber
                value={value.height.max}
                onChange={(e) => changeValue(e, "height", "max")}
                placeholder="最大"
                size="small"
                min={0}
              />
            </Col>
          </Row>
        </>
      }
    >
      <Typography.Link>
        {text} <CaretDownOutlined style={{ fontSize: 12 }} />
      </Typography.Link>
    </Popover>
  );
};

export default Size;
