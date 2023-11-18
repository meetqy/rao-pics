"use client";

import { useEffect } from "react";
import { useRecoilState } from "recoil";

import { trpc } from "@rao-pics/trpc";

import type { SettingType } from "~/states/setting";
import { defaultSetting, settingSelector } from "~/states/setting";
import Setting from "./_components/Setting";

export default function Template({ children }: { children: React.ReactNode }) {
  const [, setSetting] = useRecoilState(settingSelector);

  const { data: lib } = trpc.library.findUnique.useQuery();
  const { data: config } = trpc.config.findUnique.useQuery();

  useEffect(() => {
    if (config) {
      document.querySelector("html")?.setAttribute("data-theme", config.color);
    }
  }, [config]);

  useEffect(() => {
    const local = localStorage.getItem("setting");
    const setting = (local ? JSON.parse(local) : defaultSetting) as SettingType;

    setSetting({
      ...setting,
      trashCount: lib?.trashCount ?? 0,
      count: lib?.syncCount ?? 0,
    });
  }, [setSetting, lib]);

  return (
    <>
      {children}
      <Setting />
    </>
  );
}
