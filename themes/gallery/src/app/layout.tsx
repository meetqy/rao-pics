import "~/styles/globals.css";

import type { Metadata } from "next";

import {
  RecoilRootWrapper,
  TRPCReactProviderWrapper,
} from "./_components/LayoutWrapper";

export const metadata: Metadata = {
  title: "Gallery",
  description: "RAO.PICS 默认主题",
  manifest: "/manifest.json",
};

export default function Layout(props: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <RecoilRootWrapper>
          <TRPCReactProviderWrapper>{props.children}</TRPCReactProviderWrapper>
        </RecoilRootWrapper>
      </body>
    </html>
  );
}
