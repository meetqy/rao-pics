import { ConfigProvider, Layout, theme } from "antd";
import zhCN from "antd/locale/zh_CN";
import "antd/dist/reset.css";
import { useRecoilState, useRecoilValue } from "recoil";
import { activeMenuState, countState, tagsState } from "@/store";
import { useEffect, useMemo, useState } from "react";
import SiderMenu from "./Sider/Menu";
import SiderBasic from "./Sider/Basic";
import Head from "next/head";

export const MyLayout = ({ children }) => {
  const activeMenu = useRecoilValue(activeMenuState);
  const [_tags, setTags] = useRecoilState(tagsState);
  const [counts, setCount] = useRecoilState(countState);
  const collapsed = useMemo(() => activeMenu.includes("/tags"), [activeMenu]);
  const isInit = {
    tags: false,
  };

  const getTag = () => {
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
      getTag();
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
          style={{ borderRight: "1px solid #eee" }}
        >
          <SiderMenu />
        </Layout.Sider>
        <Layout.Content>{children}</Layout.Content>
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
