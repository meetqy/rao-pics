import {
  DeleteOutlined,
  FileImageOutlined,
  FileUnknownOutlined,
  FolderOpenFilled,
  TagsOutlined,
} from "@ant-design/icons";
import { Col, Menu, MenuProps, Row, Typography } from "antd";

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: "group"
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

function handleLabel(name: string, desc: number) {
  return (
    <Row justify="space-between">
      <Col flex={1}>{name}</Col>
      <Col>
        <Typography.Text type="secondary">{desc}</Typography.Text>
      </Col>
    </Row>
  );
}

export const SiderMenu = () => {
  const items: MenuProps["items"] = [
    getItem(handleLabel("全部", 100), "all", <FileImageOutlined />),
    getItem(handleLabel("未标签", 12), "not-tag", <FileUnknownOutlined />),
    getItem(handleLabel("标签管理", 123), "tags", <TagsOutlined />),
    getItem(handleLabel("回收站", 34), "recycle", <DeleteOutlined />),
    getItem(
      "文件夹",
      "folders",
      null,
      [
        getItem(
          handleLabel("文件夹1", 0),
          1,
          <FolderOpenFilled style={{ color: "red", fontSize: 16 }} />
        ),
      ],
      "group"
    ),
  ];

  return <Menu mode="inline" items={items} theme="light" />;
};
