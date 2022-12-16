import { MyLayout } from "@/components/Layout";
import { useRouter } from "next/router";
import { ReactElement } from "react";

const Page = () => {
  const router = useRouter();
  const { id } = router.query;
  return <div>文件夹{id}</div>;
};

Page.getLayout = function getLayout(page: ReactElement) {
  return <MyLayout>{page}</MyLayout>;
};

export default Page;
