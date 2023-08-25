import { useState } from "react";

import Menu, { menuItems } from "./components/Menu";
import BasicPage from "./pages/basic";
import SettingPage from "./pages/setting";
import UnsyncPage from "./pages/unsync";

const Layout = () => {
  const [current, setCurrent] = useState(0);

  return (
    <div className="flex h-screen w-screen overflow-hidden text-sm">
      {/* aside */}
      <aside className="relative flex h-full w-52 flex-col">
        <div
          className="h-12 w-full bg-base-200"
          style={{ appRegion: "drag" } as React.CSSProperties}
        />

        <div className="scroll-y flex-1 bg-base-200">
          <p className="mx-4 border-b border-base-300 pb-2 text-base font-medium capitalize">
            rao.library
          </p>

          {/* content */}
          <Menu current={current} onChange={(e) => setCurrent(e)} />
        </div>
      </aside>

      {/* content */}
      <div className="flex flex-1 flex-col bg-base-200/70">
        {/* title */}
        <div
          className="flex h-12 w-full flex-shrink-0 items-center px-8 text-base font-medium"
          style={{ appRegion: "drag" } as React.CSSProperties}
        >
          {menuItems[current]?.text}
        </div>

        {/* main */}
        <div className="scroll-y flex-1">
          <main className="h-full">
            {current === 0 && <BasicPage />}
            {current === 1 && <UnsyncPage />}
            {current === 2 && <SettingPage />}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Layout;
