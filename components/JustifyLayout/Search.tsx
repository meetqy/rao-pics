import { tagsState } from "@/store";
import { Col, Layout, Row, theme, Breadcrumb, Select } from "antd";
import { useMemo } from "react";
import { useRecoilValue } from "recoil";

interface Props {
  onChange?: (params: Params) => void;
  count?: number;
  params?: Params;
}

interface Params {
  tags: string[];
}

const JustifyLayoutSearch = (props: Props) => {
  const { token } = theme.useToken();
  const tags = useRecoilValue(tagsState);

  const params = useMemo(() => props?.params || { tags: [] }, [props.params]);

  return (
    <Layout.Header
      style={{
        position: "sticky",
        top: 0,
        backgroundColor: token.colorBgLayout,
        zIndex: token.zIndexPopupBase,
        padding: "0 20px",
        height: 72,
        lineHeight: "36px",
      }}
    >
      <Row style={{ height: 36 }}>
        <Col style={{ display: "flex", alignItems: "center" }}>
          <Breadcrumb separator=">">
            <Breadcrumb.Item>全部</Breadcrumb.Item>
            <Breadcrumb.Item>搜索结果({props.count})</Breadcrumb.Item>
          </Breadcrumb>
        </Col>
      </Row>
      <Row style={{ height: 36 }}>
        <Col>
          <Select
            mode="tags"
            placeholder="按标签筛选"
            value={params.tags}
            style={{ minWidth: 120 }}
            options={tags.map((item) => ({
              label: item.id,
              value: item.id,
            }))}
            maxTagCount={1}
            onChange={(e) => {
              props?.onChange({
                ...params,
                tags: e,
              });
            }}
          />
        </Col>
      </Row>
    </Layout.Header>
  );
};

export default JustifyLayoutSearch;
