import { ConfigProvider, Layout, theme } from "antd";
import zhCN from "antd/locale/zh_CN";
import "antd/dist/reset.css";
import { useRecoilState, useRecoilValue } from "recoil";
import { activeMenuState, countState, foldersState, tagsState } from "@/store";
import { useEffect, useMemo, useState } from "react";
import SiderMenu from "./Sider/Menu";
import SiderBasic from "./Sider/Basic";
import Head from "next/head";
import { transformFolderToTree } from "@/hooks";

export const MyLayout = ({ children }) => {
  const activeMenu = useRecoilValue(activeMenuState);
  const [_tags, setTags] = useRecoilState(tagsState);
  const [counts, setCount] = useRecoilState(countState);
  const [_folders, setFolders] = useRecoilState(foldersState);
  const collapsed = useMemo(() => activeMenu.includes("/tags"), [activeMenu]);
  const isInit = {
    tags: false,
    folders: false,
  };

  // 初始化 folderState
  const initFolder = () => {
    isInit.folders = true;
    fetch("/api/folder")
      .then((res) => res.json())
      .then(({ data, count }) => {
        setFolders(transformFolderToTree(data));
      });
  };

  const initTag = () => {
    isInit.tags = true;
    fetch("/api/tag")
      .then((res) => res.json())
      .then(({ count, data }) => {
        setCount((cur) => {
          return {
            ...cur,
            tags: count,
          };
        });
        setTags(data);
      });
  };

  useEffect(() => {
    if (!isInit.tags) {
      initTag();
    }

    if (!isInit.folders) {
      initFolder();
    }
  }, []);

  return (
    <ConfigProvider
      theme={{
        token: {
          // colorPrimary: "#d0d0d0",
        },
        algorithm: theme.defaultAlgorithm,
      }}
      locale={zhCN}
    >
      <Head>
        <title>rao.pics - eagleuse搭建的图片站</title>
        <meta
          name="description"
          content="把 eagle 变成我的图片（后台）管理系统。"
        />
      </Head>
      <Layout style={{ width: "100%", height: "100vh", overflow: "hidden" }}>
        <Layout.Sider
          width={240}
          theme="light"
          className="scroll-bar"
          style={{
            borderRight: "1px solid #eee",
            height: "100%",
            overflowY: "scroll",
          }}
        >
          <SiderMenu />
        </Layout.Sider>
        <Layout.Content
          className="scroll-bar"
          style={{
            overflowY: "scroll",
            overflowX: "hidden",
            height: "100%",
          }}
        >
          {children}
        </Layout.Content>
        <Layout.Sider
          width={240}
          theme="light"
          collapsed={collapsed}
          collapsedWidth={0}
        >
          <SiderBasic />
        </Layout.Sider>
      </Layout>
    </ConfigProvider>
  );
};
