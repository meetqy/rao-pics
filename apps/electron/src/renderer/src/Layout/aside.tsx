import Menu from "@renderer/components/Menu";

interface LayoutAsideProps {
  current: number;
  setCurrent: (e: number) => void;
  libraryName: string;
}

function LayoutAside({ current, setCurrent, libraryName }: LayoutAsideProps) {
  const windows = window.electron.process.platform === "win32";

  return (
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
          style={windows ? ({ appRegion: "drag" } as React.CSSProperties) : {}}
        >
          {libraryName}
        </p>
      </div>

      <div className="scroll-y flex-1 bg-base-200">
        {/* content */}
        <Menu current={current} onChange={(e) => setCurrent(e)} />
      </div>
    </aside>
  );
}

export default LayoutAside;
