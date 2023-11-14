"use client";

import "~/styles/globals.css";

import { RecoilRoot } from "recoil";

import { TRPCReactProvider } from "@rao-pics/trpc";

export default function Layout(props: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="light">
      <body>
        <RecoilRoot>
          <TRPCReactProvider {...props} />
        </RecoilRoot>
      </body>
    </html>
  );
}
