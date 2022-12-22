import { MyLayout } from "@/components/Layout";
import { RecoilRoot } from "recoil";

export default function MyApp({ Component, pageProps }) {
  return (
    <RecoilRoot>
      <MyLayout>
        <Component {...pageProps} />
      </MyLayout>
    </RecoilRoot>
  );
}
