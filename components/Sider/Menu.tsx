import { activeImageState, activeMenuState, countState } from "@/store";
import {
  DeleteOutlined,
  FileImageOutlined,
  FileUnknownOutlined,
  FolderOpenFilled,
  TagsOutlined,
} from "@ant-design/icons";
import { Col, Menu, MenuProps, Row, Typography } from "antd";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";

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

const SiderMenu = () => {
  const router = useRouter();
  const [activeMenu, setActiveMenu] = useRecoilState(activeMenuState);
  const [_activeImage, setActiveImage] = useRecoilState(activeImageState);
  const counts = useRecoilValue(countState);

  useEffect(() => {
    setActiveMenu(router.asPath as EagleUse.Menu);
    console.log(counts);
  }, [router.asPath]);

  const items: MenuProps["items"] = useMemo(() => {
    return [
      getItem(handleLabel("全部", counts.all), "/", <FileImageOutlined />),
      getItem(
        handleLabel("未标签", counts["not-tag"]),
        "/not-tag",
        <FileUnknownOutlined />
      ),
      getItem(
        handleLabel("标签管理", counts.tags),
        "/tags/mangage",
        <TagsOutlined />
      ),
      getItem(
        handleLabel("回收站", counts.recycle),
        "/recycle",
        <DeleteOutlined />
      ),
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
  }, [counts]);

  return (
    <Menu
      mode="inline"
      items={items}
      selectedKeys={[activeMenu]}
      style={{ borderRight: 0 }}
      onSelect={(e) => {
        setActiveImage(undefined);
        router.push(e.key);
      }}
    />
  );
};

export default SiderMenu;
