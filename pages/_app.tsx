import { MyLayout } from "@/components/Layout";
import { RecoilRoot, useRecoilValue } from "recoil";
import zhCN from "antd/locale/zh_CN";
import "@/styles/global.css";
import { ConfigProvider, theme } from "antd";
import { themeState } from "@/store";

export default function MyApp(props) {
  return (
    <RecoilRoot>
      <Container {...props} />
    </RecoilRoot>
  );
}

const Container = ({ Component, pageProps }) => {
  const themeMode = useRecoilValue(themeState);

  return (
    <ConfigProvider
      theme={{
        algorithm:
          themeMode === "light" ? theme.defaultAlgorithm : theme.darkAlgorithm,
      }}
      locale={zhCN}
    >
      <MyLayout>
        <Component {...pageProps} />
      </MyLayout>
    </ConfigProvider>
  );
};
