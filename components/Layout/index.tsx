import { Button, ConfigProvider, Layout, theme, Typography } from "antd";
import zhCN from "antd/locale/zh_CN";
import "antd/dist/reset.css";
import styles from "./index.module.css";
import { SiderMenu } from "../Sider/Menu";
import { SiderBasic } from "../Sider/Basic";

export const MyLayout = ({ children }) => {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#d0d0d0",
        },
        algorithm: theme.defaultAlgorithm,
      }}
      locale={zhCN}
    >
      <Layout className={styles.wrapper}>
        <Layout.Sider width={240} theme="light">
          <SiderMenu />
        </Layout.Sider>
        <Layout.Content>{children}</Layout.Content>
        <Layout.Sider width={240} theme="light">
          <SiderBasic />
        </Layout.Sider>
      </Layout>
    </ConfigProvider>
  );
};
