import { ConfigProvider, Layout, theme } from "antd";
import zhCN from "antd/locale/zh_CN";
import "antd/dist/reset.css";
import { SiderMenu } from "./Sider/Menu";
import { SiderBasic } from "./Sider/Basic";
import { RecoilRoot } from "recoil";

export const MyLayout = ({ children }) => {
  return (
    <RecoilRoot>
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
          <SiderBasic />
        </Layout>
      </ConfigProvider>
    </RecoilRoot>
  );
};
