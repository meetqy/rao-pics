"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useRecoilValue } from "recoil";

import { settingSelector } from "~/states/setting";

export default function Page() {
  const setting = useRecoilValue(settingSelector);
  const router = useRouter();

  useEffect(() => {
    router.replace("/" + setting.layout);
  }, [router, setting.layout]);

  return "loading";
}
