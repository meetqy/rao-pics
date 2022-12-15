import { ConfigProvider, Layout } from "antd";
import zhCN from "antd/locale/zh_CN";
import "antd/dist/reset.css";
import styles from "./index.module.css";

export const MyLayout = ({ children }) => {
  return (
    <ConfigProvider locale={zhCN}>
      <Layout className={styles.wrapper}>
        <Layout.Sider>left sider</Layout.Sider>
        <Layout.Content>{children}</Layout.Content>
        <Layout.Sider>right sider</Layout.Sider>
      </Layout>
    </ConfigProvider>
  );
};
