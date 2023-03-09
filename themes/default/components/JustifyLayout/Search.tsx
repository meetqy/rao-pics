import { themeState } from "@/store";
import { useRequest, useSize } from "ahooks";
import { Col, Row, theme, Input, Rate, Switch } from "antd";
import _ from "lodash";
import { useMemo, useState } from "react";
import { useRecoilState } from "recoil";
import SearchModule from "./SearchModule";

interface Props {
  onChange?: (params: EagleUse.SearchParams) => void;
  count?: number;
  params?: EagleUse.SearchParams;
}

const JustifyLayoutSearch = (props: Props) => {
  const { token } = theme.useToken();
  const size = useSize(() => document.body);

  const [themeMode, setTheme] = useRecoilState(themeState);

  const params = useMemo(() => props?.params, [props.params]);
  const [tempParams, setTempParams] = useState<{
    annotation: string;
  }>({
    annotation: params.annotation || undefined,
  });

  const onChange = ({ orderBy, tags, size, annotation, ext, star }: EagleUse.SearchParams) => {
    props?.onChange({
      ...params,
      tags,
      size,
      orderBy,
      annotation,
      ext,
      star,
    });
  };

  const tempChange = (key: string) => {
    return new Promise((resolve) => {
      const json = _.cloneDeep(params);
      if (key) json[key] = tempParams[key];

      props.onChange(json);
      resolve(true);
    });
  };

  const { run } = useRequest(tempChange, {
    debounceWait: 1000,
  });

  const hidden = useMemo(() => size?.width < token.screenXL, [size, token]);

  return (
    <div
      style={{
        position: "sticky",
        top: 0,
        backgroundColor: token.colorBgLayout,
        zIndex: token.zIndexPopupBase,
        padding: "12px 20px",
      }}
    >
      <Row justify={"space-between"}>
        <Col>
          <Row gutter={[10, 10]}>
            {!hidden && (
              <Col>
                <SearchModule.Size
                  value={params.size}
                  onChange={(e) =>
                    onChange({
                      ...params,
                      size: e,
                    })
                  }
                />
              </Col>
            )}
            <Col>
              <SearchModule.Tag
                value={params.tags}
                onChange={(e) => {
                  onChange({
                    ...params,
                    tags: e,
                  });
                }}
              />
            </Col>
            {!hidden && (
              <Col>
                <Input
                  size="small"
                  style={{ width: 120 }}
                  placeholder="注释"
                  allowClear
                  value={tempParams.annotation}
                  onChange={(e) => {
                    setTempParams({
                      ...tempParams,
                      annotation: e.target.value,
                    });

                    tempParams.annotation = e.target.value;
                    tempParams.annotation ? run("annotation") : tempChange("annotation");
                  }}
                />
              </Col>
            )}
            <Col>
              <SearchModule.Ext
                value={params.ext}
                onChange={(e) => {
                  onChange({
                    ...params,
                    ext: e,
                  });
                }}
              />
            </Col>
            {!hidden && (
              <Col>
                <Rate
                  style={{ fontSize: 16 }}
                  value={params.star}
                  onChange={(e) => {
                    onChange({
                      ...params,
                      star: e,
                    });
                  }}
                />
              </Col>
            )}
          </Row>
        </Col>

        <Col style={{ display: "flex", justifyContent: "flex-end" }}>
          <Row gutter={[10, 10]}>
            <Col>
              <SearchModule.SortRule
                onChange={(e) => {
                  onChange({
                    ...params,
                    orderBy: e,
                  });
                }}
              />
            </Col>
            <Col>
              <SearchModule.Sort
                onChange={(e) => {
                  onChange({
                    ...params,
                    orderBy: e,
                  });
                }}
              />
            </Col>
            <Col>
              <Switch
                checked={themeMode === "dark"}
                checkedChildren={"☀️"}
                unCheckedChildren={"🌛"}
                onChange={(e) => {
                  setTheme(e ? "dark" : "light");
                }}
              />
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default JustifyLayoutSearch;
