import { memo } from "react";

interface SyncCircleProps {
  pendingCount: number;
}

export const SyncCircle = memo(function SyncCircle({
  pendingCount,
}: SyncCircleProps) {
  console.log("222", pendingCount);
  return (
    <div
      className="radial-progress border-4 border-neutral/50 bg-neutral text-neutral-content/70"
      style={
        {
          "--value": 70,
          "--size": "9rem",
          "--thickness": "1rem",
        } as React.CSSProperties
      }
    >
      <p className="truncate text-center font-mono text-lg font-medium text-neutral-content">
        {pendingCount}
      </p>
      <p className="text-center text-xs text-neutral-content/70">等待同步</p>
    </div>
  );
});
