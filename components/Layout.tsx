import { ConfigProvider, Layout, theme } from "antd";
import zhCN from "antd/locale/zh_CN";
import "antd/dist/reset.css";
import { useRecoilState, useRecoilValue } from "recoil";
import { activeMenuState, countState, tagsState } from "@/store";
import { useEffect, useMemo } from "react";
import SiderMenu from "./Sider/Menu";
import SiderBasic from "./Sider/Basic";

export const MyLayout = ({ children }) => {
  const activeMenu = useRecoilValue(activeMenuState);
  const [tags, setTags] = useRecoilState(tagsState);
  const [counts, setCount] = useRecoilState(countState);
  const collapsed = useMemo(() => ["/tags"].includes(activeMenu), [activeMenu]);

  useEffect(() => {
    fetch("/api/tag")
      .then((res) => res.json())
      .then(({ count, data }) => {
        setCount({
          ...counts,
          tags: count,
        });
        setTags(data);
      });
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
      <Layout style={{ width: "100%", height: "100vh", overflow: "hidden" }}>
        <Layout.Sider width={240} theme="light">
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
