export const NavBar = (props: { name?: string; platform?: NodeJS.Platform }) => {
  const isDarwin = props.platform === "darwin";

  return (
    <div className="flex h-12 w-full flex-shrink-0" style={{ "-webkit-app-region": "drag" } as React.CSSProperties}>
      <div className="bg-base-200/70 flex h-full w-1/4 items-center px-2">{!isDarwin && <p>统计信息</p>}</div>
      <div className="flex h-full flex-1 items-center px-4">
        <p className="select-none font-medium capitalize">{props.name}</p>
      </div>
    </div>
  );
};
