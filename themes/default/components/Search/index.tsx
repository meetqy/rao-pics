import { Col, Row, Space, theme } from "antd";
import SearchCondition from "./condition";

const Search = () => {
  const { token } = theme.useToken();

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
          <Space>
            <SearchCondition.Keyword />
            <SearchCondition.Ext />
            <SearchCondition.Size />
          </Space>
        </Col>
        <Col>
          <SearchCondition.Sort />
        </Col>
      </Row>
    </div>
  );
};

export default Search;
