"use client";

import { useEffect } from "react";
import { useRecoilState } from "recoil";

import { trpc } from "@rao-pics/trpc";

import type { SettingType } from "~/states/setting";
import { defaultSetting, settingSelector } from "~/states/setting";

export default function Page({ children }: { children: React.ReactNode }) {
  const [, setSetting] = useRecoilState(settingSelector);

  const { data: lib } = trpc.library.findUnique.useQuery();

  useEffect(() => {
    const local = localStorage.getItem("setting");
    const setting = (local ? JSON.parse(local) : defaultSetting) as SettingType;

    setSetting({
      ...setting,
      trashCount: lib?.trashCount ?? 0,
      count: lib?.syncCount ?? 0,
    });
  }, [setSetting, lib]);

  return children;
}
