import { useState } from "react";

import { useColor, useLanguage } from "../hooks";
import Index from "../pages/index";
import { trpc } from "../utils/trpc";
import LayoutAside from "./aside";
import LayoutContent from "./content";

const languages = {
  "zh-cn": {
    no_library: "暂无资源库",
  },
  "en-us": {
    no_library: "No library",
  },
  "zh-tw": {
    no_library: "暫無資源庫",
  },
};

const Layout = () => {
  const [current, setCurrent] = useState(0);
  const { lang } = useLanguage(languages);
  const { color } = useColor();

  const { data: library } = trpc.library.get.useQuery();
  const libraryName = library?.path.split("/").slice(-1)[0] ?? lang.no_library;

  return (
    <div
      data-theme={color}
      className="flex h-screen w-screen overflow-hidden rounded bg-base-100 text-sm"
    >
      {/* aside */}
      <LayoutAside
        current={current}
        setCurrent={setCurrent}
        libraryName={libraryName}
      />

      {/* content */}
      {library ? <LayoutContent current={current} /> : <Index />}
    </div>
  );
};

export default Layout;
