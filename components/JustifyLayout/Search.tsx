import { tagsState } from "@/store";
import { Col, Layout, Row, theme, Breadcrumb, Select } from "antd";
import { useMemo } from "react";
import { useRecoilValue } from "recoil";
import SearchModule from "./SearchModule";

interface Props {
  onChange?: (params: EagleUse.SearchParams) => void;
  count?: number;
  params?: EagleUse.SearchParams;
}

const JustifyLayoutSearch = (props: Props) => {
  const { token } = theme.useToken();
  const tags = useRecoilValue(tagsState);

  const params = useMemo(() => props?.params, [props.params]);

  const onChange = ({ tags, size }: EagleUse.SearchParams) => {
    props?.onChange({
      ...params,
      tags,
      size,
    });
  };

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
      <Row style={{ height: 36 }} gutter={[10, 10]}>
        <Col>
          <Select
            size="small"
            mode="tags"
            allowClear
            placeholder="按标签筛选"
            value={params.tags}
            style={{ minWidth: 120 }}
            options={tags.map((item) => ({
              label: item.id,
              value: item.id,
            }))}
            maxTagCount={1}
            onClear={() => onChange({ tags: [] })}
            onChange={(e) => onChange({ ...params, tags: e })}
          />
        </Col>

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
      </Row>
    </Layout.Header>
  );
};

export default JustifyLayoutSearch;
