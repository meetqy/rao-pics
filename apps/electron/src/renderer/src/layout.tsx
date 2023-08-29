import { useState } from "react";

import Menu from "./components/Menu";
import { useColor } from "./hooks";
import BasicPage from "./pages/basic";
import ColorPage from "./pages/color";
import SettingPage from "./pages/setting";
import UnsyncPage from "./pages/unsync";

// import { trpc } from "./utils/trpc";

const Layout = () => {
  const [current, setCurrent] = useState(0);

  const { color } = useColor();

  const windows = window.electron.process.platform === "win32";

  // trpc.library.

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
      {current === 3 && <ColorPage />}
    </div>
  );
};

export default Layout;
