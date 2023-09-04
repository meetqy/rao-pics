import { useState } from "react";
import { trpc } from "@renderer/utils/trpc";

interface SyncCircleProps {
  pendingCount: number;
}

export function SyncCircle({ pendingCount }: SyncCircleProps) {
  const utils = trpc.useContext();

  const [data, setData] = useState<{
    status: "completed" | "error" | "ok";
    count: number;
    type: "folder" | "reading" | "image";
  }>();

  // 监听资源库变化
  trpc.library.onWatch.useSubscription(undefined, {
    onData: (data) => {
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
        type: "reading",
      });
    },
  });

  // 监听同步变化
  trpc.sync.onStart.useSubscription(undefined, {
    onData: (data) => {
      console.log(data);
      if (data.status === "completed") {
        setTimeout(() => {
          setData(undefined);
        }, 500);

        return;
      } else if (data.status === "error") {
        console.error(data);
      }

      setData({
        status: data.status,
        count: data.count,
        type: "folder",
      });
    },
  });

  const Description = () => {
    let text = "等待同步";

    if (data?.type === "folder") text = "文件夹同步中...";
    if (data?.type === "reading") text = "读取中...";

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
