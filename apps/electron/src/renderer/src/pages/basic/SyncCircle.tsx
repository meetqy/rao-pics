import { useState } from "react";
import { useLanguage } from "@renderer/hooks";
import { trpc } from "@renderer/utils/trpc";

interface SyncCircleProps {
  pendingCount: number;
}

const languages = {
  "zh-cn": {
    pending: "等待同步",
    reading: "读取中...",
    syncing: "同步中...",
  },
  "en-us": {
    pending: "Pending",
    reading: "Reading...",
    syncing: "Syncing...",
  },
  "zh-tw": {
    pending: "等待同步",
    reading: "讀取中...",
    syncing: "同步中...",
  },
};

export function SyncCircle({ pendingCount }: SyncCircleProps) {
  const utils = trpc.useContext();
  const { lang } = useLanguage(languages);

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
        type: "folder",
      });
    },
  });

  const Description = () => {
    let text = lang.pending;

    if (data?.type === "reading") text = lang.reading;
    else if (data?.type === "image" || data?.type === "folder") {
      text = lang.syncing;
    }

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
