import { MyLayout } from "@/components/Layout";
import { RecoilRoot, useRecoilState } from "recoil";
import zhCN from "antd/locale/zh_CN";
import "antd/dist/reset.css";
import "@/styles/global.css";
import { ConfigProvider, theme } from "antd";
import { ThemeMode, themeState } from "@/store";
import Head from "next/head";
import Pkg from "@/package.json";
import { useEffect } from "react";

export default function MyApp(props) {
  return (
    <RecoilRoot>
      <Container {...props} />
    </RecoilRoot>
  );
}

const Container = ({ Component, pageProps }) => {
  const [themeMode, setThemeMode] = useRecoilState(themeState);

  // 初始化 store
  useEffect(() => {
    const localMode = localStorage.getItem("use-local-mode") as ThemeMode;
    setThemeMode(localMode || "light");
  }, [setThemeMode]);

  return (
    <>
      <Head>
        <title>{`${Pkg.description} - ${Pkg.name.toLocaleUpperCase()}`}</title>
        <link rel="shortcut icon" href="/static/favicon.ico" />
        <meta name="description" content={`${Pkg.description} - ${Pkg.name.toLocaleUpperCase()}`} />
      </Head>
      <ConfigProvider
        theme={{
          algorithm: themeMode === "light" ? theme.defaultAlgorithm : theme.darkAlgorithm,
        }}
        locale={zhCN}
      >
        <MyLayout>
          <Component {...pageProps} />
        </MyLayout>
      </ConfigProvider>
    </>
  );
};
