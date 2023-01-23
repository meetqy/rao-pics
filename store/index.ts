export * from "./constant";

import { createContext } from "react";
import { atom } from "recoil";

export const activeMenuState = atom({
  key: "activeMenuState",
  default: "/" as EagleUse.Menu,
});

export const countState = atom({
  key: "countState",
  default: {
    all: 0,
    "not-tag": 0,
    tags: 0,
    recycle: 0,
  },
});

export interface RightBasic {
  // 名字
  name: string;
  // 描述
  desc?: string;
  // 文件数
  fileCount?: number;
  // 文件大小
  fileSize?: number;
  // 添加日期 时间戳
  modificationTime?: number;
  // 选中的图片
  image?: EagleUse.Image;
}

// 右侧基础信息
export const rightBasicState = atom({
  key: "rightBasicState",
  default: {} as RightBasic,
});

// layout content ref
export const LayoutContentRefContext = createContext({ current: null });

// 主题
export type ThemeMode = "light" | "dark";
export const themeState = atom({
  key: "themeState",
  default: "light" as ThemeMode,
  effects_UNSTABLE: [
    ({ onSet }) => {
      onSet((val) => {
        localStorage.setItem("use-local-mode", val);
      });
    },
  ],
});
