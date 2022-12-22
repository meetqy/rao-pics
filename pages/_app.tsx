import { MyLayout } from "@/components/Layout";
import { RecoilRoot } from "recoil";
import "@/styles/global.css";

export default function MyApp({ Component, pageProps }) {
  return (
    <RecoilRoot>
      <MyLayout>
        <Component {...pageProps} />
      </MyLayout>
    </RecoilRoot>
  );
}
