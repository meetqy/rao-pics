import { themeState } from "@/store";
import { useRequest } from "ahooks";
import { Col, Layout, Row, theme, Input, Rate, Switch } from "antd";
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

  const [themeMode, setTheme] = useRecoilState(themeState);

  const params = useMemo(() => props?.params, [props.params]);
  const [tempParams, setTempParams] = useState<{
    annotation: string;
  }>({
    annotation: undefined,
  });

  const onChange = ({
    orderBy,
    tags,
    size,
    annotation,
    ext,
    star,
  }: EagleUse.SearchParams) => {
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
      const json = params;
      if (key) json[key] = tempParams[key];

      props.onChange(json);
      resolve(true);
    });
  };

  const { run } = useRequest(tempChange, {
    debounceWait: 1000,
  });

  return (
    <Layout.Header
      style={{
        position: "sticky",
        top: 0,
        backgroundColor: token.colorBgElevated,
        zIndex: token.zIndexPopupBase,
        padding: "0 20px",
        height: 48,
        lineHeight: "48px",
      }}
    >
      <Row style={{ height: 48 }}>
        <Col flex={1}>
          <Row gutter={[10, 10]}>
            <Col>
              <SearchModule.Size
                onChange={(e) =>
                  onChange({
                    ...params,
                    size: e,
                  })
                }
              />
            </Col>
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
            <Col>
              <Input
                size="small"
                style={{ width: 120 }}
                placeholder="注释"
                allowClear
                value={tempParams.annotation}
                onChange={(e) => {
                  setTempParams({ ...tempParams, annotation: e.target.value });

                  tempParams.annotation = e.target.value;
                  tempParams.annotation
                    ? run("annotation")
                    : tempChange("annotation");
                }}
              />
            </Col>
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
          </Row>
        </Col>

        <Col span={6} style={{ display: "flex", justifyContent: "flex-end" }}>
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
    </Layout.Header>
  );
};

export default JustifyLayoutSearch;
