import { tagsState } from "@/store";
import {
  AppstoreFilled,
  QuestionCircleFilled,
  StarFilled,
  TagsFilled,
} from "@ant-design/icons";
import {
  Button,
  Col,
  Divider,
  Layout,
  Menu,
  MenuProps,
  Row,
  Typography,
} from "antd";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { pinyin } from "@/hooks";

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

type routeName = "manage" | "no" | "starred";

/**
 * 数组转json 首字母开头作为分组
 * @param tags 完整tags
 * @param exclude 需要排除的tags
 * @returns { [key: string]: string[] }
 */
const tagsArrayToJson = (tags: EagleUse.Tag[]) => {
  const json: { [key: string]: EagleUse.Tag[] } = {};
  tags.forEach((item) => {
    const first = (
      pinyin.getCamelChars(item.id) as string
    )[0].toLocaleUpperCase();

    // 是数字的放在其他中
    if (!isNaN(Number(first))) {
      json.number ? json.number.push(item) : (json.number = [item]);
    } else {
      json[first] ? json[first].push(item) : (json[first] = [item]);
    }
  });

  return json;
};

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
  const router = useRouter();
  const name = router.query.name as routeName;
  const tags = useRecoilValue(tagsState);
  const [tagsCollection, setTagsCollection] = useState<{
    [key in routeName]: { [key: string]: EagleUse.Tag[] } | undefined;
  }>({
    manage: undefined,
    no: undefined,
    starred: undefined,
  });

  // 标签管理
  useEffect(() => {
    setTagsCollection({
      ...tagsCollection,
      manage: tagsArrayToJson(tags),
    });
  }, [name, tags]);

  // 渲染tags列表
  const tagsContentElement = (tagJson: { [key: string]: EagleUse.Tag[] }) => {
    const result = Object.keys(tagJson);
    if (!result.length) return;

    return result.map((k, index) => {
      const item = tagJson[k];
      return (
        <div key={k}>
          <Row>
            <Col>
              <Typography.Title
                level={3}
                style={{ textTransform: "capitalize" }}
              >
                {k === "number" ? "#" : k}{" "}
                <Typography.Text type="secondary">
                  ({item.length})
                </Typography.Text>
              </Typography.Title>
            </Col>
          </Row>
          <Row gutter={[10, 10]}>
            {item.map((tag) => (
              <Col key={tag.id}>
                <Button size="small" shape="round">
                  {tag.id}
                </Button>
              </Col>
            ))}
          </Row>
          {result.length - 1 > index && <Divider />}
        </div>
      );
    });
  };

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
          <Menu
            items={items}
            selectedKeys={["/tags/" + name]}
            onSelect={(e) => {
              router.push(e.key);
            }}
          />
        </Layout.Sider>
        <Layout.Content style={{ padding: 20, overflowY: "scroll" }}>
          {tagsContentElement(tagsCollection[name] || {})}
        </Layout.Content>
      </Layout>
    </Layout>
  );
}
