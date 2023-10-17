import { useEffect } from "react";
import { useRouter } from "next/router";
import { useRecoilValue } from "recoil";

import { settingSelector } from "~/states/setting";

export default function Home() {
  const router = useRouter();
  const setting = useRecoilValue(settingSelector);

  useEffect(() => {
    void router.replace("/" + setting.layout);
  }, [router, setting.layout]);
}
