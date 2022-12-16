import { activeMenuState } from "@/store";
import { Layout } from "antd";
import { useMemo } from "react";
import { useRecoilValue } from "recoil";

export const SiderBasic = () => {
  const activeMenu = useRecoilValue(activeMenuState);
  const collapsed = useMemo(() => ["/tags"].includes(activeMenu), [activeMenu]);

  return (
    <Layout.Sider
      width={240}
      theme="light"
      collapsed={collapsed}
      collapsedWidth={0}
    >
      <div>basic</div>
    </Layout.Sider>
  );
};
