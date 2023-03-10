import { Col, Row, theme } from "antd";
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
          <Row gutter={[10, 10]}>
            <Col>
              <SearchCondition.Size />
            </Col>
          </Row>
        </Col>
        <Col></Col>
      </Row>
    </div>
  );
};

export default Search;
