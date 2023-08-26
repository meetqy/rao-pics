import { useState } from "react";

import Menu, { menuItems } from "./components/Menu";
import WindowsTitleBarBtnGroup from "./components/WindowsTitleBarBtnGroup";
import BasicPage from "./pages/basic";
import SettingPage from "./pages/setting";
import ThemePage from "./pages/theme";
import UnsyncPage from "./pages/unsync";

const Layout = () => {
  const [current, setCurrent] = useState(0);

  const windows = window.process.platform === "win32";

  return (
    <div className="flex h-full w-full overflow-hidden text-sm">
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
            className="mx-4 h-12 border-b border-base-300 pb-2 pt-4 text-base font-medium capitalize"
            style={
              windows ? ({ appRegion: "drag" } as React.CSSProperties) : {}
            }
          >
            rao.library
          </p>
        </div>

        <div className="scroll-y flex-1 bg-base-200">
          {/* content */}
          <Menu current={current} onChange={(e) => setCurrent(e)} />
        </div>
      </aside>

      {/* content */}
      <div className="flex flex-1 flex-col bg-base-200/70">
        {/* title */}
        <div className="flex h-12 w-full flex-shrink-0 justify-between pl-8 text-base font-medium">
          <div
            className="flex h-full flex-1 items-center"
            style={{ appRegion: "drag" } as React.CSSProperties}
          >
            {menuItems[current]?.text}
          </div>

          {/* windows btn group */}
          <WindowsTitleBarBtnGroup />
        </div>

        {/* main */}
        <div className="scroll-y flex-1">
          <main>
            {current === 0 && <BasicPage />}
            {current === 1 && <UnsyncPage />}
            {current === 2 && <SettingPage />}
            {current === 3 && <ThemePage />}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Layout;
