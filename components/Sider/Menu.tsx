import { transformFolderToTree } from "@/hooks";
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
  GithubOutlined,
  TagsOutlined,
} from "@ant-design/icons";
import {
  Button,
  Col,
  Divider,
  Layout,
  Menu,
  MenuProps,
  Row,
  theme,
  Typography,
} from "antd";
import { useRouter } from "next/router";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import Pkg from "@/package.json";
import Link from "next/link";
import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: "group",
  onTitleClick?: (info: { key: string; domEvent }) => void
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
      handleLabel(item.title, item.count || null),
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

  // 文件夹
  const folders = useRecoilValue(foldersState);
  const foldersTree = useMemo(() => transformFolderToTree(folders), [folders]);

  const [openKeys, setOpenKeys] = useState<string[]>([]);
  const { token } = theme.useToken();

  // 当前route
  const route = useMemo(() => {
    const { asPath, pathname } = router;
    if (pathname === "/") return pathname;
    if (asPath.includes("/folder")) return asPath;

    return _constantMenu.find((item) => asPath.includes(item));
  }, [router]);

  // 设置菜单选中
  useEffect(() => {
    setActiveMenu(route as EagleUse.Menu);
  }, [route, setActiveMenu]);

  const onFolderIconClick = useCallback(
    (e: React.MouseEvent, folder: EagleUse.Folder) => {
      e.stopPropagation();
      e.preventDefault();
      if (!folder.children || !folder.children.length) return;
      const key = `/folder/${folder.id}`;
      const index = openKeys.indexOf(key);

      index > -1 ? openKeys.splice(index, 1) : openKeys.push(key);

      setOpenKeys([...openKeys]);
    },
    [openKeys]
  );

  // 菜单信息列表
  const itemsData = useMemo(() => {
    const original = [
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
        title: `文件夹(${folders.length})`,
        count: 0,
        route: "/folders",
        icon: null,
        group: true,
        children: foldersTree.map((folder) => {
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
              router.push(info.key);
            },
          };
        }),
      },
    ];

    if (publicRuntimeConfig.showTrash) {
      original.splice(3, 0, {
        title: "回收站",
        count: counts.recycle,
        route: "/recycle",
        icon: <DeleteOutlined />,
      });
    }

    return original;
  }, [
    counts,
    foldersTree,
    openKeys,
    onFolderIconClick,
    folders.length,
    router,
  ]);

  // 当前的folder
  const folder = useMemo(
    () => folders.find((item) => `/folder/${item.id}` === route),
    [route, folders]
  );

  // 当前的菜单信息
  const nowItemData = useMemo(
    () => itemsData.find((item) => item.route === route),
    [itemsData, route]
  );

  // 设置右侧菜单信息
  useEffect(() => {
    if (folder) {
      if (!route.includes(folder.id)) return;
      if (
        folder.name === rightBasic.name &&
        folder._count.images === rightBasic.fileCount
      )
        return;

      if (folder.pid) setOpenKeys(["/folder/" + folder.pid]);

      setRightBasic((rightBasic) => ({
        ...rightBasic,
        name: folder.name,
        fileCount: folder._count.images,
        image: null,
      }));
    } else {
      if (!nowItemData) return;
      if (
        nowItemData.title === rightBasic.name &&
        nowItemData.count === rightBasic.fileCount
      )
        return;

      setRightBasic((rightBasic) => ({
        ...rightBasic,
        name: nowItemData.title,
        fileCount: nowItemData.count,
        image: null,
      }));
    }
  }, [folder, route, setRightBasic, nowItemData, rightBasic]);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <style jsx global>{`
        .ant-menu-submenu-selected > div:first-child {
          background-color: ${token.colorPrimaryBg}!important;
          color: ${token.colorPrimaryTextActive}!important;
        }
      `}</style>

      <Layout.Header
        style={{
          position: "sticky",
          top: 0,
          backgroundColor: token.colorBgElevated,
          zIndex: token.zIndexPopupBase,
          padding: "0 20px",
          height: 48,
          lineHeight: "48px",
          marginBottom: 6,
        }}
      >
        <Row>
          <Col>
            <Link href="/" style={{ color: token.colorTextBase }}>
              <Typography.Text strong style={{ fontSize: 18 }}>
                Eagle
              </Typography.Text>
              <Typography.Text
                strong
                style={{ fontSize: 18, color: token.colorSuccess }}
              >
                Use
              </Typography.Text>
            </Link>
          </Col>
          <Col span={2}></Col>
          <Col>
            <Link
              href={"https://github.com/meetqy/eagleuse/releases"}
              target="_blank"
            >
              <Typography.Text type="secondary">v{Pkg.version}</Typography.Text>
            </Link>
          </Col>
        </Row>
      </Layout.Header>

      <Layout.Content>
        <Menu
          mode="inline"
          items={treeRecursion(itemsData)}
          expandIcon={<span></span>}
          selectedKeys={[activeMenu]}
          style={{
            borderRight: 0,
            backgroundColor: "transparent",
          }}
          openKeys={openKeys}
          inlineIndent={10}
          onSelect={(e) => {
            const key = e.key === "/tags" ? e.key + "/manage" : e.key;
            router.push(key);
          }}
        />
      </Layout.Content>

      <Layout.Footer
        style={{
          textAlign: "center",
          padding: 12,
          paddingTop: 0,
        }}
      >
        <Divider />
        <Row justify={"center"}>
          <Col>
            <Button
              type="link"
              target="_blank"
              href="https://github.com/meetqy/eagleuse"
              icon={<GithubOutlined style={{ fontSize: 18 }} />}
            />
          </Col>
        </Row>

        <Typography.Text type="secondary">
          Copyright © {new Date().getFullYear()} - rao.pics
        </Typography.Text>
      </Layout.Footer>
    </Layout>
  );
};

export default SiderMenu;
