"use client";

import "~/styles/globals.css";

import { RecoilRoot } from "recoil";

import { TRPCReactProvider } from "@rao-pics/trpc";

import Setting from "./_components/Setting";

export default function Layout(props: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="light">
      <body>
        <RecoilRoot>
          <TRPCReactProvider>
            {props.children}
            <Setting />
          </TRPCReactProvider>
        </RecoilRoot>
      </body>
    </html>
  );
}
