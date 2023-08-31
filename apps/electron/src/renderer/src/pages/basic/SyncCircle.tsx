import { useState } from "react";
import { trpc } from "@renderer/utils/trpc";

interface SyncCircleProps {
  pendingCount: number;
}

export function SyncCircle({ pendingCount }: SyncCircleProps) {
  const [conut, setCount] = useState(0);
  const utils = trpc.useContext();

  // 监听资源库变化
  trpc.library.onWatch.useSubscription(undefined, {
    onData: (data) => {
      if (data.status === "completed") {
        setCount(0);
        void utils.library.invalidate();
      } else {
        setCount(data.count);
      }
    },
  });

  return (
    <div
      className="radial-progress border-4 border-neutral/50 bg-neutral text-neutral-content/70"
      style={
        {
          "--value": 0,
          "--size": "9rem",
          "--thickness": "1rem",
        } as React.CSSProperties
      }
    >
      <p className="truncate text-center font-mono text-lg font-medium text-neutral-content">
        {conut || pendingCount}
      </p>
      <p className="text-center text-xs text-neutral-content/70">
        {conut ? "读取中..." : "等待同步"}
      </p>
    </div>
  );
}
