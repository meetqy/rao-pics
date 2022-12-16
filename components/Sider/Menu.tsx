import { activeMenuState } from "@/store";
import {
  DeleteOutlined,
  FileImageOutlined,
  FileUnknownOutlined,
  FolderOpenFilled,
  TagsOutlined,
} from "@ant-design/icons";
import { Col, Menu, MenuProps, Row, Typography } from "antd";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useRecoilState } from "recoil";

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
  const router = useRouter();
  const [activeMenu, setActiveMenu] = useRecoilState(activeMenuState);

  useEffect(() => {
    setActiveMenu(router.route as EagleUse.Menu);
  }, [router.route]);

  const items: MenuProps["items"] = [
    getItem(handleLabel("全部", 100), "/", <FileImageOutlined />),
    getItem(handleLabel("未标签", 12), "/not-tag", <FileUnknownOutlined />),
    getItem(handleLabel("标签管理", 123), "/tags", <TagsOutlined />),
    getItem(handleLabel("回收站", 34), "/recycle", <DeleteOutlined />),
    getItem(
      "文件夹",
      "/folders",
      null,
      [
        getItem(
          handleLabel("文件夹1", 0),
          "/folder/1",
          <FolderOpenFilled style={{ color: "red" }} />
        ),
        getItem(
          handleLabel("文件夹2", 0),
          "/folder/2",
          <FolderOpenFilled style={{ color: "red" }} />
        ),
      ],
      "group"
    ),
  ];

  return (
    <Menu
      mode="inline"
      items={items}
      selectedKeys={[activeMenu]}
      onSelect={(e) => {
        router.push(e.key);
      }}
    />
  );
};
