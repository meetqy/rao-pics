export const CONSTANT = {
  // 支持的扩展名
  EXT: ["jpg", "png", "jpeg", "gif", "webp", "mp4"] as const,
};

export interface Constant {
  ext: (typeof CONSTANT.EXT)[number];
}
