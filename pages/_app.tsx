import { MyLayout } from "@/components/Layout";
import { RecoilRoot, useRecoilValue } from "recoil";
import zhCN from "antd/locale/zh_CN";
import "antd/dist/reset.css";
import "@/styles/global.css";
import { ConfigProvider, theme } from "antd";
import { themeState } from "@/store";
import Head from "next/head";
import Pkg from "@/package.json";

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
    <>
      <Head>
        <title>
          {Pkg.description} - {Pkg.name.toLocaleUpperCase()}
        </title>
        <link rel="shortcut icon" href="/static/favicon.ico" />
        <meta
          name="description"
          content={`${Pkg.description} - ${Pkg.name.toLocaleUpperCase()}`}
        />
      </Head>
      <ConfigProvider
        theme={{
          algorithm:
            themeMode === "light"
              ? theme.defaultAlgorithm
              : theme.darkAlgorithm,
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
