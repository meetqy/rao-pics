import { foldersState } from "@/store";
import { transformFolderToTree } from "@/utils";
import {
  FileImageOutlined,
  FileUnknownOutlined,
  TagsOutlined,
  DeleteOutlined,
  FolderOpenFilled,
  FolderFilled,
} from "@ant-design/icons";
import { Menu, MenuProps, theme } from "antd";
import { useEffect, useMemo, useRef, useState } from "react";
import { useRecoilValue } from "recoil";
import { getFolderItems } from "./getFolderItems";
import { useRouter } from "next/router";
import { useMount } from "ahooks";

const baseItems: MenuProps["items"] = [
  { label: "全部", icon: <FileImageOutlined />, key: "/" },
  { label: "未标签", icon: <FileUnknownOutlined />, key: "/not-tag" },
  { label: "标签管理", icon: <TagsOutlined />, key: "/tags" },
  { label: "回收站", icon: <DeleteOutlined />, key: "/recycle" },
  { type: "divider" },
];

const SideMenu = () => {
  const [openKeys, setOpenKeys] = useState<string[]>([]);
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  const router = useRouter();
  const { token } = theme.useToken();

  // 文件夹
  const folders = useRecoilValue(foldersState);
  const foldersTree = useMemo(() => transformFolderToTree(folders), [folders]);
  const [folderItems, setFolderItems] = useState<MenuProps["items"]>([]);
  const isFolderInit = useRef(false);

  useEffect(() => {
    if (router.isReady) {
      const { id } = router.query;
      if (id) {
        setSelectedKeys([id as string]);
        const folder = folders.find((item) => item.id === id);
        setOpenKeys(folder && folder.pid ? [folder.pid] : []);
      }
    }
  }, [router, folders]);

  useMount(() => {
    const { route } = router;
    if (route === "/") return setSelectedKeys(["/"]);
    if (route.includes("/not-tag")) return setSelectedKeys(["/not-tag"]);
    if (route.includes("/tags")) return setSelectedKeys(["/tags"]);
    if (route.includes("/recycle")) return setSelectedKeys(["/recycle"]);
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const folderIconClick = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>, props: any) => {
    e.stopPropagation();

    const { eventKey = "" } = props;

    const index = openKeys.indexOf(eventKey);
    index > -1 ? openKeys.splice(index, 1) : openKeys.push(eventKey);
    setOpenKeys([...openKeys]);
  };

  useEffect(() => {
    if (!isFolderInit.current && foldersTree.length > 0) {
      setFolderItems([getFolderItems(foldersTree)]);
    }
  }, [foldersTree, openKeys]);

  const items = useMemo(() => baseItems.concat(folderItems || []), [folderItems]);

  return (
    <>
      <style jsx global>{`
        .ant-menu-submenu-selected > div:first-child {
          background-color: ${token.colorPrimaryBg}!important;
          color: ${token.colorPrimaryTextActive}!important;
        }

        .ant-menu-submenu > div:first-child {
          padding-left: 24px !important;
        }

        .ant-menu-submenu .ant-menu-submenu-title {
          flex-direction: row-reverse;
        }

        .ant-menu-submenu .ant-menu-title-content {
          padding-left: 12px;
        }
      `}</style>
      <Menu
        openKeys={openKeys}
        expandIcon={(props) => {
          return props.isOpen ? (
            <FolderOpenFilled onClick={(e) => folderIconClick(e, props)} />
          ) : (
            <FolderFilled onClick={(e) => folderIconClick(e, props)} />
          );
        }}
        selectedKeys={selectedKeys}
        defaultSelectedKeys={["1"]}
        defaultOpenKeys={["sub1"]}
        mode="inline"
        items={items}
        onClick={(e) => {
          router.push(e.key === "/tags" ? e.key + "/manage" : e.key);
          setSelectedKeys([e.key]);
        }}
        onOpenChange={(e) => {
          router.push(`/folder/${e[e.length - 1]}`);
          setSelectedKeys(e);
        }}
      />
    </>
  );
};

export default SideMenu;
