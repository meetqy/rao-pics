const VIDEO_EXT = ["mp4", "avi", "mov", "wmv", "flv", "webm", "mkv"] as const;
const IMG_EXT = ["jpg", "png", "jpeg", "gif", "webp"] as const;

const GRID_COL = {
  "04": "grid-cols-4",
  "06": "grid-cols-6",
  "08": "grid-cols-8",
  "12": "grid-cols-12",
} as const;

export const CONSTANT = {
  VIDEO_EXT,
  IMG_EXT,
  // 支持的扩展名
  EXT: [...VIDEO_EXT, ...IMG_EXT] as const,
  GRID_COL,
};

export interface Constant {
  ext: (typeof CONSTANT.EXT)[number];
  gridColClassName: "grid-cols-2" | "grid-cols-4" | "grid-cols-6" | "grid-cols-8" | "grid-cols-12";
}
