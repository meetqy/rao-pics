import { useState } from "react";

import { trpc } from "@rao-pics/trpc";

import { useColor } from "../hooks";
import Index from "../pages/index";
import LayoutAside from "./aside";
import LayoutContent from "./content";

const Layout = () => {
  const [current, setCurrent] = useState(0);
  const { color } = useColor();

  const { data: library } = trpc.library.findUnique.useQuery();
  const libraryName = library?.path.split(/\/|\\/).slice(-1)[0] ?? "暂无资源库";

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
