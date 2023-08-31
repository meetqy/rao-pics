interface ContentProps {
  title: React.ReactNode;
  children?: React.ReactNode;
}

const Content = ({ title, children }: ContentProps) => {
  return (
    <div className="relative flex flex-1 flex-col bg-base-200/70">
      {/* title */}
      {title}

      {/* main */}
      <div className="scroll-y flex-1">
        {children}
        {/* <main>
        {current === 0 && <BasicPage />}
        {current === 1 && <UnsyncPage />}
        {current === 2 && <SettingPage />}
        {current === 3 && <ThemePage />}
      </main> */}
      </div>
    </div>
  );
};

export default Content;
