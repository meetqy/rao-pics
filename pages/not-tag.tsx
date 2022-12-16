import { MyLayout } from "@/components/Layout";
import { ReactElement } from "react";

export default function Page() {
  return <div>not-tag</div>;
}

Page.getLayout = function getLayout(page: ReactElement) {
  return <MyLayout>{page}</MyLayout>;
};
