import {
  activeMenuState,
  countState,
  foldersState,
  rightBasicState,
} from "@/store";
import {
  DeleteOutlined,
  FileImageOutlined,
  FileUnknownOutlined,
  FolderFilled,
  FolderOpenFilled,
  TagsOutlined,
} from "@ant-design/icons";
import { Col, Menu, MenuProps, Row, theme, Typography } from "antd";
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
  onTitleClick?: (info: any) => void
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

const _constantMenu = ["/not-tag", "/tags", "/folder", "/recycle"];

interface ItemData {
  title: string;
  count: number;
  route: string;
  icon: JSX.Element;
  group?: boolean;
  children?: ItemData[];
  onTitleClick?;
}

// 递归生成 菜单data
const treeRecursion = (data: ItemData[]) => {
  return data.map((item) => {
    return getItem(
      handleLabel(item.title, item.count),
      item.route,
      item.icon,
      item.children && item.children.length > 0
        ? treeRecursion(item.children)
        : null,
      item.group ? "group" : null,
      item.onTitleClick
    );
  });
};

const SiderMenu = () => {
  const router = useRouter();

  const [activeMenu, setActiveMenu] = useRecoilState(activeMenuState);
  const [rightBasic, setRightBasic] = useRecoilState(rightBasicState);
  const counts = useRecoilValue(countState);
  const folders = useRecoilValue(foldersState);
  const [openKeys, setOpenKeys] = useState<string[]>([]);
  const { token } = theme.useToken();

  const route = useMemo(() => {
    const asPath = router.asPath;
    if (asPath === "/") return asPath;
    if (asPath.includes("/folder")) return asPath;

    return _constantMenu.find((item) => asPath.includes(item));
  }, [router]);

  useEffect(() => {
    setActiveMenu(route as EagleUse.Menu);
  }, [route]);

  const onFolderIconClick = (e: React.MouseEvent, folder: EagleUse.Folder) => {
    e.stopPropagation();
    e.preventDefault();
    if (!folder.children || !folder.children.length) return;
    const key = `/folder/${folder.id}`;
    const index = openKeys.indexOf(key);

    index > -1 ? openKeys.splice(index, 1) : openKeys.push(key);

    setOpenKeys([...openKeys]);
  };

  const itemsData = useMemo(() => {
    return [
      {
        title: "全部",
        count: counts.all,
        route: "/",
        icon: <FileImageOutlined />,
      },
      {
        title: "未标签",
        count: counts["not-tag"],
        route: "/not-tag",
        icon: <FileUnknownOutlined />,
      },
      {
        title: "标签管理",
        count: counts.tags,
        route: "/tags",
        icon: <TagsOutlined />,
      },
      {
        title: "回收站",
        count: counts.recycle,
        route: "/recycle",
        icon: <DeleteOutlined />,
      },
      {
        title: "文件夹",
        count: 0,
        route: "/folders",
        icon: null,
        group: true,
        children: folders.map((folder) => {
          const { children = [] } = folder;

          return {
            title: folder.name,
            count: folder._count.images,
            route: `/folder/${folder.id}`,
            icon: openKeys.includes(`/folder/${folder.id}`) ? (
              <FolderOpenFilled
                style={{ color: folder.iconColor }}
                onClick={(e) => onFolderIconClick(e, folder)}
              />
            ) : (
              <FolderFilled
                style={{ color: folder.iconColor }}
                onClick={(e) => onFolderIconClick(e, folder)}
              />
            ),
            children: children.length
              ? children.map((childFolder) => ({
                  title: childFolder.name,
                  count: childFolder._count.images,
                  route: `/folder/${childFolder.id}`,
                  icon: (
                    <FolderFilled style={{ color: childFolder.iconColor }} />
                  ),
                }))
              : null,
            onTitleClick: (info) => {
              setActiveMenu(info["key"]);
              console.log(info);
              setRightBasic({
                ...rightBasic,
                name: (info.domEvent.target as HTMLElement).innerText,
                image: undefined,
              });
              router.push(info["key"]);
            },
          };
        }),
      },
    ];
  }, [counts, folders, openKeys]);

  const items: MenuProps["items"] = useMemo(() => {
    return treeRecursion(itemsData);
  }, [itemsData]);

  return (
    <>
      <style jsx global>{`
        .ant-menu-submenu-selected > div:first-child {
          background-color: ${token.colorPrimaryBg}!important;
          color: ${token.colorPrimaryTextActive}!important;
        }
      `}</style>
      <Menu
        mode="inline"
        items={items}
        expandIcon={<span></span>}
        selectedKeys={[activeMenu]}
        style={{ borderRight: 0 }}
        openKeys={openKeys}
        inlineIndent={10}
        onSelect={(e) => {
          // 点击最外部文件夹，并且子文件夹存在，不会触发改方法
          setRightBasic({
            ...rightBasic,
            name: (e.domEvent.target as HTMLElement).innerText,
            image: undefined,
          });
          router.push(e.key === "/tags" ? e.key + "/manage" : e.key);
        }}
      />
    </>
  );
};

export default SiderMenu;
