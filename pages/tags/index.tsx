import {
  AppstoreFilled,
  QuestionCircleFilled,
  StarFilled,
  TagsFilled,
} from "@ant-design/icons";
import { Layout, Menu, MenuProps } from "antd";

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

export default function Page() {
  const items: MenuProps["items"] = [
    getItem("标签管理", "/tags/manage", <AppstoreFilled />),
    getItem("未分类", "/tags/no", <QuestionCircleFilled />),
    getItem("常用标签", "/tags/starred", <StarFilled />),
    getItem(
      "标签群组",
      "",
      null,
      [getItem("每日更新", "/tags/[id]", <TagsFilled />)],
      "group"
    ),
  ];

  return (
    <Layout style={{ height: "100%" }}>
      <Layout.Header
        style={{
          height: 44,
          backgroundColor: "white",
          lineHeight: "44px",
          borderBottom: "1px solid #eee",
          paddingLeft: "24px",
        }}
      >
        标签管理(94)
      </Layout.Header>
      <Layout>
        <Layout.Sider width={240} theme="light">
          <Menu items={items} />
        </Layout.Sider>
        <Layout.Content>tags</Layout.Content>
      </Layout>
    </Layout>
  );
}
