export * from "./constant";

import { RefObject, createContext } from "react";
import { atom } from "recoil";

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
export const LayoutContentRefContext = createContext<RefObject<HTMLElement | null>>({ current: null });
