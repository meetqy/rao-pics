import { CaretDownOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { Badge, Button, Col, InputNumber, Popover, Row, Typography } from "antd";
import { useRef } from "react";
import { ArrayParam, BooleanParam, useQueryParams } from "use-query-params";

const Size = () => {
  const [size, setSize] = useQueryParams({
    w: ArrayParam,
    h: ArrayParam,
    r: BooleanParam,
  });

  const isChange = useRef(false);

  function getText(size: {
    w: (string | null)[] | null | undefined;
    h: (string | null)[] | null | undefined;
  }) {
    if (!size) return "尺寸";

    const [wMin, wMax] = (size.w || [0, 0]).map((item) => (item ? +item : 0));
    const [hMin, hMax] = (size.h || [0, 0]).map((item) => (item ? +item : 0));

    let w = "";
    let h = "";
    if (wMax && wMin) {
      w = `${wMin}≤宽≤${wMax}`;
    } else if (wMin && !wMax) {
      w = `宽≥${wMin}`;
    } else if (wMax && !wMin) {
      w = `宽≤${wMax}`;
    }

    if (hMin && hMax) {
      h = `${hMin}≤高≤${hMax}`;
    } else if (hMin && !hMax) {
      h = `高≥${hMin}`;
    } else if (hMax && !hMin) {
      h = `高≤${hMax}`;
    }

    let t = w + ", " + h;
    t = t.replace(/(,\s)$/, "").replace(/^(,\s)/, "");

    return t || "尺寸";
  }

  function getValue(type: "w" | "h", s: 0 | 1) {
    const t = size[type];
    if (!t) return undefined;
    const v = t[s];
    return v ? Number(v) : undefined;
  }

  function setValue(e: number | null, type: "w" | "h", s: 0 | 1) {
    const _size = { ...size };

    const t = _size[type] || [];
    t[s] = e ? e.toString() : null;

    _size[type] = t;

    isChange.current = true;
    setSize({ ..._size });
  }

  return (
    <Popover
      placement="bottom"
      trigger={"click"}
      onOpenChange={(e) => {
        if (!e && isChange.current) {
          setSize({
            ...size,
            r: true,
          });
        }
      }}
      content={
        <>
          <Row gutter={[40, 0]} align="middle">
            <Col>宽</Col>
            <Col>
              <InputNumber
                value={getValue("w", 0)}
                onChange={(e) => setValue(e, "w", 0)}
                placeholder="最小"
                size="small"
                min={0}
              />
              <span> - </span>
              <InputNumber
                value={getValue("w", 1)}
                onChange={(e) => setValue(e, "w", 1)}
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
                value={getValue("h", 0)}
                onChange={(e) => setValue(e, "h", 0)}
                placeholder="最小"
                size="small"
                min={0}
              />
              <span> - </span>
              <InputNumber
                value={getValue("h", 1)}
                onChange={(e) => setValue(e, "h", 1)}
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
              (size.w || size.h) && (
                <CloseCircleOutlined
                  onClick={(e) => {
                    e.stopPropagation();
                    setSize({
                      w: null,
                      h: null,
                      r: true,
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
            {getText(size)} <CaretDownOutlined style={{ fontSize: 12 }} />
          </Typography.Link>
        </Button>
      </Badge>
    </Popover>
  );
};

export default Size;
