import { MyLayout } from "@/components/Layout";
import { Layout } from "antd";
import { ReactElement, useEffect } from "react";
import type { NextPageWithLayout } from "./_app";

const Page: NextPageWithLayout = () => {
  useEffect(() => {}, []);

  // const getImageList = () => {
  //   fetch("/api/image/list", {});
  // };

  return (
    <Layout>
      <Layout.Content style={{ position: "relative" }}></Layout.Content>
    </Layout>
  );
};

Page.getLayout = function getLayout(page: ReactElement) {
  return <MyLayout>{page}</MyLayout>;
};

export default Page;
