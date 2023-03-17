import { Col, Row, Space, theme } from "antd";
import SearchCondition from "./condition";
import DarkMode from "../DarkMode";
import NSFW from "../NSFW";

const Search = () => {
  const { token } = theme.useToken();

  return (
    <div
      style={{
        position: "sticky",
        top: 0,
        backgroundColor: token.colorBgLayout,
        zIndex: token.zIndexPopupBase,
        padding: 12,
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
          <Space>
            <NSFW />
            <SearchCondition.Sort />
            <DarkMode />
          </Space>
        </Col>
      </Row>
    </div>
  );
};

export default Search;
