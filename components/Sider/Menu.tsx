import {
  activeImageState,
  activeMenuState,
  countState,
  foldersState,
} from "@/store";
import {
  DeleteOutlined,
  FileImageOutlined,
  FileUnknownOutlined,
  FolderOpenFilled,
  TagsOutlined,
} from "@ant-design/icons";
import { Col, Menu, MenuProps, Row, Typography } from "antd";
import _ from "lodash";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: "group",
  onTitleClick?
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
    onTitleClick,
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
  const folders = useRecoilValue(foldersState);
  const [openKeys, setOpenKeys] = useState<string[]>([]);

  useEffect(() => {
    const pathname = router.pathname as EagleUse.Menu;
    setActiveMenu(pathname.includes("/tags") ? "/tags" : pathname);
  }, [router.asPath]);

  const items: MenuProps["items"] = useMemo(() => {
    return [
      getItem(handleLabel("全部", counts.all), "/", <FileImageOutlined />),
      getItem(
        handleLabel("未标签", counts["not-tag"]),
        "/not-tag",
        <FileUnknownOutlined />
      ),
      getItem(handleLabel("标签管理", counts.tags), "/tags", <TagsOutlined />),
      getItem(
        handleLabel("回收站", counts.recycle),
        "/recycle",
        <DeleteOutlined />
      ),
      getItem(
        "文件夹",
        "/folders",
        null,
        folders.map((folder) => {
          const { children = [] } = folder;
          return getItem(
            handleLabel(folder.name, folder._count.images),
            `/folder/${folder.id}`,
            <FolderOpenFilled
              style={{ color: folder.iconColor }}
              onClick={(e) => {
                const key = `/folder/${folder.id}`;
                const index = openKeys.indexOf(key);

                index > -1 ? openKeys.splice(index, 1) : openKeys.push(key);

                setOpenKeys([...openKeys]);
              }}
            />,
            children.length
              ? children.map((childFolder) =>
                  getItem(
                    handleLabel(childFolder.name, childFolder._count.images),
                    `/folder/${childFolder.id}`,
                    <FolderOpenFilled
                      style={{ color: childFolder.iconColor }}
                    />
                  )
                )
              : null,
            null,
            (info) => {
              router.push(info["key"]);
            }
          );
        }),
        "group"
      ),
    ];
  }, [counts, folders]);

  return (
    <Menu
      mode="inline"
      items={items}
      expandIcon={<span></span>}
      selectedKeys={[activeMenu]}
      style={{ borderRight: 0 }}
      openKeys={openKeys}
      inlineIndent={10}
      onSelect={(e) => {
        setActiveImage(undefined);
        router.push(e.key === "/tags" ? e.key + "/manage" : e.key);
      }}
    />
  );
};

export default SiderMenu;
