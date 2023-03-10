import { CaretDownOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { useMount } from "ahooks";
import { Badge, Button, Col, InputNumber, Popover, Row, Typography } from "antd";
import _ from "lodash";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";

type Size = number | undefined | null;

interface Value {
  width: { min: Size; max: Size };
  height: { min: Size; max: Size };
}

const Size = () => {
  const [value, setValue] = useState<Value>({
    width: { min: undefined, max: undefined },
    height: { min: undefined, max: undefined },
  });

  const router = useRouter();
  const { query, pathname } = router;

  // 解析URL赋值给value
  useMount(() => {
    // h=min,max
    // w=min,max
    const { w, h } = query;

    const [wMin, wMax] = w ? (w as string).split("-").map((item) => Number(item)) : [0, 0];
    const [hMin, hMax] = h ? (h as string).split("-q").map((item) => Number(item)) : [0, 0];

    if (isNaN(wMax) || isNaN(wMin) || isNaN(hMin) || isNaN(hMax)) {
      return;
    }

    const queryValue: Value = {
      width: { min: wMin, max: wMax },
      height: { min: hMin, max: hMax },
    };

    if (_.isEqual(queryValue, value)) {
      return;
    }

    setValue({
      ...queryValue,
    });
  });

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

  // value 转换为 URL query
  useEffect(() => {
    const _query: { w?: string; h?: string } = {};
    _query.w = [value.width.min || 0, value.width.max || 0].join("-");
    _query.h = [value.height.min || 0, value.height.max || 0].join("-");

    if (_query.w === "0-0" && _query.h === "0-0") {
      delete query.w;
      delete query.h;
      router.push(pathname, { query });
      return;
    }

    router.push(pathname, {
      query: {
        ...query,
        ..._query,
      },
    });
  }, [value, router, pathname, query]);

  const changeValue = (v: Size, type: keyof Value, size: "min" | "max") => {
    value[type][size] = v;

    setValue({
      ...value,
    });
  };

  const showClose = useMemo(() => {
    const { width, height } = value;
    return (width.min || 0) + (width.max || 0) + (height.min || 0) + (height.max || 0) > 0;
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
      <Badge
        size="small"
        status="error"
        count={
          <Button
            size="small"
            type="link"
            danger
            icon={
              showClose && (
                <CloseCircleOutlined
                  onClick={(e) => {
                    e.stopPropagation();
                    setValue({
                      width: { max: undefined, min: undefined },
                      height: { max: undefined, min: undefined },
                    });
                  }}
                />
              )
            }
          />
        }
      >
        <Button size="small" type="link">
          <Typography.Link>
            {text} <CaretDownOutlined style={{ fontSize: 12 }} />
          </Typography.Link>
        </Button>
      </Badge>
    </Popover>
  );
};

export default Size;
