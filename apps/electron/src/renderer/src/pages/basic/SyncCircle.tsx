import { useState } from "react";

import { trpc } from "@rao-pics/trpc";

type Status = "completed" | "error" | "ok" | "start";

interface SyncCircleProps {
  pendingCount: number;
  onListenData?: (status: Status) => void;
  onSyncData?: (status: Status) => void;
}

export function SyncCircle({
  pendingCount,
  onListenData,
  onSyncData,
}: SyncCircleProps) {
  const utils = trpc.useUtils();

  const [data, setData] = useState<{
    status: Status;
    count: number;
    type: "folder" | "reading" | "image";
  }>();

  // 监听资源库变化
  trpc.library.onWatch.useSubscription(undefined, {
    onData: (data) => {
      onListenData?.(data.status);

      if (data.status === "completed") {
        setTimeout(() => {
          void utils.library.invalidate();
          setData(undefined);
        }, 100);

        return;
      } else if (data.status === "error") {
        console.error(data);
      }

      setData({
        status: data.status,
        count: data.count,
        type: "reading",
      });
    },
  });

  // 监听同步变化
  trpc.sync.onStart.useSubscription(undefined, {
    onData: (data) => {
      onSyncData?.(data.status);
      if (data.status === "completed") {
        setTimeout(() => {
          void utils.library.invalidate();
          setData(undefined);
        }, 500);

        return;
      } else if (data.status === "error") {
        console.error(data);
      }

      setData({
        status: data.status,
        count: data.count,
        type: data.type,
      });
    },
  });

  const Description = () => {
    let text = "等待同步";

    if (data?.type === "reading") text = "读取中...";
    else if (["image", "folder"].includes(data?.type ?? "")) text = "同步中...";

    return (
      <p className="text-center text-xs text-neutral-content/70">{text}</p>
    );
  };

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
        {data?.count ?? pendingCount}
      </p>

      <Description />
    </div>
  );
}
