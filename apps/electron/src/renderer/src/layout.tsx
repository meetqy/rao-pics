import { useState } from "react";

import Menu from "./components/Menu";
import BasicPage from "./pages/basic";
import SettingPage from "./pages/setting";
import ThemePage from "./pages/theme";
import UnsyncPage from "./pages/unsync";

const Layout = () => {
  const [current, setCurrent] = useState(0);

  const windows = window.electron.process.platform === "win32";

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
            className={`mx-4 border-b border-base-300 pb-2 text-base font-medium capitalize ${
              windows ? "h-12 pt-4" : "h-8"
            }`}
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
      {current === 0 && <BasicPage />}
      {current === 1 && <UnsyncPage />}
      {current === 2 && <SettingPage />}
      {current === 3 && <ThemePage />}
    </div>
  );
};

export default Layout;
