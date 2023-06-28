const VIDEO_EXT = ["mp4", "avi", "mov", "wmv", "flv", "webm", "mkv"] as const;
const IMG_EXT = ["jpg", "png", "jpeg", "gif", "webp"] as const;

// app
const APP = ["eagle", "pixcall", "billfish", "folder"] as const;

export const CONSTANT = {
  VIDEO_EXT,
  IMG_EXT,
  // 支持的扩展名
  EXT: [...VIDEO_EXT, ...IMG_EXT] as const,
  // app
  APP,
};

export interface Constant {
  ext: (typeof CONSTANT.EXT)[number];
  app: (typeof CONSTANT.APP)[number];
}
