export * from "./pinyin";
export * from "./transform";

export const handleImageUrl = (
  image: EagleUse.Image,
  // 是否返回原图
  original: boolean = false
) => {
  let prefix = `/library/${image.id}.info/${image.name}`;

  if (original) {
    return `${prefix}.${image.ext}`;
  }

  if (image.noThumbnail) {
    return `${prefix}.${image.ext}`;
  } else {
    return `${prefix}_thumbnail.png`;
  }
};
