import WindowsTitleBarBtnGroup from "./WindowsTitleBarBtnGroup";

interface TitleProps {
  children?: React.ReactNode;
}

const Title = ({ children }: TitleProps) => {
  const windows = window.electron.process.platform === "win32";

  return (
    <div className="flex h-12 w-full flex-shrink-0 justify-between pl-8 text-base font-medium">
      <div
        className="flex h-full flex-1 select-none items-center"
        style={{ appRegion: "drag" } as React.CSSProperties}
      >
        {children}
      </div>

      {/* windows btn group */}
      {windows && <WindowsTitleBarBtnGroup />}
    </div>
  );
};

export default Title;
