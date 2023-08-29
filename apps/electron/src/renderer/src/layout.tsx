import { useState } from "react";

import Menu from "./components/Menu";
import { useColor, useLanguage } from "./hooks";
import BasicPage from "./pages/basic";
import ColorPage from "./pages/color";
import Empty from "./pages/empty";
import SettingPage from "./pages/setting";
import UnsyncPage from "./pages/unsync";
import { trpc } from "./utils/trpc";

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

  const windows = window.electron.process.platform === "win32";

  const { data: library } = trpc.library.get.useQuery();

  const libraryName = library?.path.split("/").slice(-1) ?? lang.no_library;

  const Content = () => (
    <>
      {current === 0 && <BasicPage />}
      {current === 1 && <UnsyncPage />}
      {current === 2 && <SettingPage />}
      {current === 3 && <ColorPage />}
    </>
  );

  return (
    <div
      data-theme={color}
      className="flex h-screen w-screen overflow-hidden rounded bg-base-100 text-sm"
    >
      {/* aside */}
      <aside className="relative flex h-full w-52 flex-col bg-base-200">
        <div>
          {!windows && (
            <div
              className="h-12 w-full bg-base-200"
              style={{ appRegion: "drag" } as React.CSSProperties}
            />
          )}

          <p
            className={`mx-4 border-b border-base-300 pb-2 text-base font-medium capitalize ${
              windows ? "h-12 pt-4" : "h-8"
            }`}
            style={
              windows ? ({ appRegion: "drag" } as React.CSSProperties) : {}
            }
          >
            {libraryName}
          </p>
        </div>

        <div className="scroll-y flex-1 bg-base-200">
          {/* content */}
          <Menu current={current} onChange={(e) => setCurrent(e)} />
        </div>
      </aside>

      {/* content */}
      {library ? <Content /> : <Empty />}
    </div>
  );
};

export default Layout;
