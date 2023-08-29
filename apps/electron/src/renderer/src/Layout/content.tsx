import BasicPage from "@renderer/pages/basic";
import ColorPage from "@renderer/pages/color";
import SettingPage from "@renderer/pages/setting";
import UnsyncPage from "@renderer/pages/unsync";

function LayoutContent({ current }: { current: number }) {
  return (
    <>
      {current === 0 && <BasicPage />}
      {current === 1 && <UnsyncPage />}
      {current === 2 && <SettingPage />}
      {current === 3 && <ColorPage />}
    </>
  );
}

export default LayoutContent;
