const VIDEO_EXT = ["mp4"] as const;
const IMG_EXT = ["jpg", "png", "jpeg", "gif", "webp"] as const;

export const CONSTANT = {
  VIDEO_EXT,
  IMG_EXT,
  // 支持的扩展名
  EXT: [...VIDEO_EXT, ...IMG_EXT] as const,
};

export interface Constant {
  ext: (typeof CONSTANT.EXT)[number];
}
