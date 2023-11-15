"use client";

import "~/styles/globals.css";

import { useEffect } from "react";
import { RecoilRoot, useRecoilState } from "recoil";

import { TRPCReactProvider } from "@rao-pics/trpc";

import type { SettingType } from "~/states/setting";
import { defaultSetting, settingSelector } from "~/states/setting";
import Setting from "./_components/Setting";

const App = ({ children }: { children: React.ReactNode }) => {
  const [, setSetting] = useRecoilState(settingSelector);

  useEffect(() => {
    const local = localStorage.getItem("setting");
    setSetting((local ? JSON.parse(local) : defaultSetting) as SettingType);
  }, [setSetting]);

  return <TRPCReactProvider>{children}</TRPCReactProvider>;
};

export default function Layout(props: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="light">
      <body>
        <RecoilRoot>
          <App>
            {props.children}
            <Setting />
          </App>
        </RecoilRoot>
      </body>
    </html>
  );
}
