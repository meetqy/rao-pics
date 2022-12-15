import { Button, ConfigProvider, Layout, theme, Typography } from "antd";
import zhCN from "antd/locale/zh_CN";
import "antd/dist/reset.css";
import styles from "./index.module.css";

export const MyLayout = ({ children }) => {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#333",
        },
        algorithm: theme.darkAlgorithm,
      }}
      locale={zhCN}
    >
      <Layout className={styles.wrapper}>
        <Layout.Sider width={240} theme="light">
          <Typography.Text>Left sider</Typography.Text>
          <Button type="primary">primary</Button>
        </Layout.Sider>
        <Layout.Content>{children}</Layout.Content>
        <Layout.Sider width={240} theme="light">
          <Typography.Text>right sider</Typography.Text>
          <Button>123</Button>
        </Layout.Sider>
      </Layout>
    </ConfigProvider>
  );
};
