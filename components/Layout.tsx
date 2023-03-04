import { Layout, theme, Typography } from "antd";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  activeMenuState,
  countState,
  foldersState,
  LayoutContentRefContext,
  tagsState,
} from "@/store";
import {
  useCallback,
  useContext,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react";
import SiderMenu from "./Sider/Menu";
import SiderBasic from "./Sider/Basic";
import { useSize } from "ahooks";

export const MyLayout = ({ children }) => {
  const activeMenu = useRecoilValue(activeMenuState) || "/";
  const [, setTags] = useRecoilState(tagsState);
  const [, setCount] = useRecoilState(countState);
  const [, setFolders] = useRecoilState(foldersState);
  const collapsed = useMemo(() => activeMenu.includes("/tags"), [activeMenu]);
  const [isInit] = useState({
    tags: false,
    folders: false,
  });
  const { token } = theme.useToken();
  const size = useSize(() => document.body);

  const isMobile = useMemo(() => size?.width < token.screenSM, [size, token]);

  const LayoutContentRefC = useContext(LayoutContentRefContext);
  const layoutContentRef = useRef(null);

  useImperativeHandle(LayoutContentRefC, () => layoutContentRef);

  // 初始化 folderState
  const initFolder = useCallback(() => {
    isInit.folders = true;
    fetch(`/api/folder`)
      .then((res) => res.json())
      .then(({ data }) => {
        setFolders(data);
      });
  }, [isInit, setFolders]);

  const initTag = useCallback(() => {
    isInit.tags = true;
    fetch(`/api/tag`, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        include: {
          tagsGroups: true,
          _count: {
            select: {
              images: true,
            },
          },
        },
      }),
    })
      .then((res) => res.json())
      .then(({ count, data }) => {
        setCount((cur) => {
          return {
            ...cur,
            tags: count,
          };
        });
        setTags(data);
      });
  }, [isInit, setCount, setTags]);

  useEffect(() => {
    if (!isInit.tags) {
      initTag();
    }

    if (!isInit.folders) {
      initFolder();
    }
  }, [isInit, initTag, initFolder]);

  // 解决菜单闪烁问题
  if (!isInit.folders) return null;

  return (
    <>
      <style jsx global>
        {`
          .scroll-bar::-webkit-scrollbar {
            width: 4px;
            height: 12px;
          }
          .scroll-bar::-webkit-scrollbar-thumb {
            background: ${token.colorBorder};
            border-radius: 12px;
          }
          .scroll-bar::-webkit-scrollbar-track {
            background-color: ${token.colorBgContainer};
          }
        `}
      </style>

      {isMobile ? (
        <Layout
          style={{
            width: "100%",
            height: "100vh",
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography.Text style={{ fontSize: 96, marginTop: -48 }}>
            ☕️
          </Typography.Text>
          <Typography.Title style={{ marginTop: 0 }}>
            开发在划水
          </Typography.Title>
          <Typography.Text>一切尽在不言中</Typography.Text>
        </Layout>
      ) : (
        <Layout style={{ width: "100%", height: "100vh", overflow: "hidden" }}>
          <Layout.Sider
            width={240}
            theme="light"
            className="scroll-bar"
            style={{
              borderRight: `1px solid ${token.colorBorderSecondary}`,
              height: "100%",
              overflowY: "auto",
            }}
          >
            <SiderMenu />
          </Layout.Sider>
          <Layout.Content
            ref={layoutContentRef}
            className="scroll-bar"
            style={{
              overflowY: "auto",
              overflowX: "hidden",
              height: "100%",
            }}
          >
            {children}
          </Layout.Content>
          {!collapsed && (
            <Layout.Sider
              width={240}
              theme="light"
              breakpoint="xxl"
              collapsedWidth={0}
              className="scroll-bar"
              style={{
                borderRight: `1px solid ${token.colorBorderBg}`,
                height: "100%",
                overflowY: "auto",
              }}
            >
              <SiderBasic />
            </Layout.Sider>
          )}
        </Layout>
      )}
    </>
  );
};
