import { tagsState } from "@/store";
import { AppstoreFilled, QuestionCircleFilled, StarFilled, TagsFilled } from "@ant-design/icons";
import { Col, Divider, Layout, Menu, MenuProps, Row, Tag, theme, Typography } from "antd";
import { useRouter } from "next/router";
import { useEffect, useMemo, useRef, useState } from "react";
import { useRecoilValue } from "recoil";
import { pinyin } from "@/utils";
import Link from "next/link";
import { Prisma } from "@eagleuse/prisma-client";

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

type RouteName = "manage" | "no" | "starred" | string;

/**
 * 数组转json 首字母开头作为分组
 * @param tags 完整tags
 * @param exclude 需要排除的tags
 * @returns { [key: string]: string[] }
 */
const tagsArrayToJson = (tags: EagleUse.TagWithCountImage[]) => {
  const json: { [key: string]: EagleUse.TagWithCountImage[] } = {};
  tags.forEach((item) => {
    const first = (pinyin.getCamelChars(item.id) as string)[0].toLocaleUpperCase();

    // 是数字的放在其他中
    if (!isNaN(Number(first))) {
      json.number ? json.number.push(item) : (json.number = [item]);
    } else {
      json[first] ? json[first].push(item) : (json[first] = [item]);
    }
  });

  return json;
};

function handleLabel(name: string, desc: number | undefined, color?: string) {
  return (
    <Row justify="space-between" style={{ color: color }}>
      <Col flex={1}>{name}</Col>
      <Col>
        <Typography.Text type="secondary">{desc}</Typography.Text>
      </Col>
    </Row>
  );
}

type TagsCollection = {
  [key in RouteName]: {
    data:
      | { [key: string]: (EagleUse.TagWithCountImage & { tagsGroups?: EagleUse.TagsGroup[] })[] }
      | undefined;
    count: number | undefined;
  };
};

export default function Page() {
  const router = useRouter();
  const name = router.query.name as RouteName;
  const tags = useRecoilValue(tagsState);
  const tagsGroupsIsLoad = useRef(false);
  const [tagsCollection, setTagsCollection] = useState<TagsCollection>({
    manage: { data: undefined, count: undefined },
    no: { data: undefined, count: undefined },
    starred: { data: undefined, count: undefined },
  });

  const nowTagData = useMemo(() => tagsCollection[name]?.data || {}, [name, tagsCollection]);

  const [tagsGroupsItems, setTagsGroupsItems] = useState<MenuItem[]>([]);

  const items = useMemo(() => {
    const { manage, no, starred } = tagsCollection;

    return [
      getItem(handleLabel("标签管理", manage.count), "/tags/manage", <AppstoreFilled />),
      getItem(handleLabel("未分类", no.count), "/tags/no", <QuestionCircleFilled />),
      getItem(handleLabel("常用标签", starred.count), "/tags/starred", <StarFilled />),
      getItem(`标签群组(${tagsGroupsItems.length})`, "", null, tagsGroupsItems, "group"),
    ];
  }, [tagsCollection, tagsGroupsItems]);

  // 标签管理
  useEffect(() => {
    if (name != "manage") return;
    if (tagsCollection["manage"].count != undefined) return;

    setTagsCollection((tagsCollection) => ({
      ...tagsCollection,
      manage: {
        data: tagsArrayToJson(tags),
        count: tags.length,
      },
    }));
  }, [name, tags, tagsCollection]);

  const getTag = async (where: Prisma.TagWhereInput) => {
    return await fetch(`/api/tag`, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        where,
        include: {
          tagsGroups: true,
          _count: {
            select: {
              images: true,
            },
          },
        },
      }),
    });
  };

  useEffect(() => {
    if (name != "no") return;
    if (tagsCollection["no"].count != undefined) return;

    getTag({
      tagsGroups: { none: {} },
    })
      .then((res) => res.json())
      .then(({ data, count: _count }) => {
        setTagsCollection({
          ...tagsCollection,
          no: {
            data: tagsArrayToJson(data),
            count: _count,
          },
        });
      });
  }, [name, tagsCollection]);

  // starred
  useEffect(() => {
    if (name != "starred") return;
    if (tagsCollection["starred"].count != undefined) return;

    getTag({
      starred: true,
    })
      .then((res) => res.json())
      .then(({ data, count: _count }) => {
        setTagsCollection({
          ...tagsCollection,
          starred: {
            data: tagsArrayToJson(data),
            count: _count,
          },
        });
      });
  }, [name, tagsCollection]);

  // tagsgroups
  useEffect(() => {
    if (!tags || !tags.length) return;
    if (!name) return;
    if (Object.keys(tagsCollection).length > 3) return;
    if (tagsGroupsIsLoad.current) return;

    tagsGroupsIsLoad.current = true;

    fetch(`/api/tags-groups`, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        include: {
          tags: true,
        },
      }),
    })
      .then((res) => res.json())
      .then(({ data }) => {
        const tagsGroups: TagsCollection = {};
        const filterData = (data as (EagleUse.TagsGroup & { tags: EagleUse.TagWithCountImage[] })[]).map(
          (item) => {
            // 找到有count的标签 并 过滤掉标签中图片为0的标签
            item.tags = item.tags
              .map((tag) => tags.find((item) => tag.id === item.id))
              .filter((item) => item) as EagleUse.TagWithCountImage[];

            const json: { [key: string]: EagleUse.TagWithCountImage[] } = {};
            json[item.name] = item.tags;

            tagsGroups[item.id] = {
              data: json,
              count: item.tags.length,
            };

            return item;
          }
        );

        setTagsCollection((value) => ({
          ...value,
          ...tagsGroups,
        }));

        setTagsGroupsItems(
          filterData.map((item) => {
            return getItem(
              handleLabel(item.name, item.tags.length, item.color || "inherit"),
              `/tags/${item.id}`,
              <TagsFilled style={{ color: item.color || "inherit" }} />
            );
          })
        );
        tagsGroupsIsLoad.current = false;
      });
  }, [name, tags, tagsCollection]);

  // 渲染tags列表
  const tagsContentElement = (tagJson: {
    [key: string]: (EagleUse.TagWithCountImage & { tagsGroups?: EagleUse.TagsGroup[] })[];
  }) => {
    const result = Object.keys(tagJson).sort();
    if (!result.length) return;

    return result.map((k, index) => {
      const item = tagJson[k];

      return (
        <div key={k}>
          <Row>
            <Col>
              <Typography.Title level={3} style={{ textTransform: "capitalize" }}>
                {k === "number" ? "#" : k} <Typography.Text type="secondary">({item.length})</Typography.Text>
              </Typography.Title>
            </Col>
          </Row>
          <Row gutter={[10, 10]}>
            {item.map((tag) => (
              <Col key={tag.id}>
                <Tag
                  color={
                    tag.tagsGroups && tag.tagsGroups.length ? tag.tagsGroups[0].color || "default" : "default"
                  }
                >
                  <Link href={`/tag/${tag.id}?page=1&r=true`}>
                    {tag.id}
                    <Typography.Text type="secondary" strong style={{ marginLeft: 5 }}>
                      {tag._count.images}
                    </Typography.Text>
                  </Link>
                </Tag>
              </Col>
            ))}
          </Row>
          {result.length - 1 > index && <Divider />}
        </div>
      );
    });
  };

  const { token } = theme.useToken();

  return (
    <Layout style={{ height: "100%" }}>
      <Layout.Header
        style={{
          height: 44,
          backgroundColor: token.colorBgElevated,
          lineHeight: "44px",
          borderBottom: `1px solid ${token.colorBorderBg}`,
          paddingLeft: "24px",
        }}
      >
        标签管理({tags.length})
      </Layout.Header>
      <Layout>
        <Layout.Sider width={240}>
          <Menu
            style={{ height: "100%" }}
            mode="inline"
            items={items}
            selectedKeys={["/tags/" + name]}
            onSelect={(e) => {
              router.push(e.key);
            }}
          />
        </Layout.Sider>
        <Layout.Content className="scroll-bar" style={{ padding: 20, overflowY: "auto" }}>
          {tagsContentElement(nowTagData)}
        </Layout.Content>
      </Layout>
    </Layout>
  );
}
