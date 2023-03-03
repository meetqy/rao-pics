import getConfig from "next/config";

export * from "./pinyin";
export * from "./transform";

const { publicRuntimeConfig } = getConfig();

export const HOST = publicRuntimeConfig.PLUGIN_API_HOST;

export const handleImageUrl = (
  image: EagleUse.Image,
  // 是否返回原图
  original?: boolean
) => {
  const prefix = `${HOST}/public/${image.id}.info/${image.name}`;

  if (original) {
    return `${prefix}.${image.ext}`;
  }

  if (image.noThumbnail) {
    return `${prefix}.${image.ext}`;
  } else {
    return `${prefix}_thumbnail.png`;
  }
};

export const handleImageAlt = (image: EagleUse.Image) => {
  let str = "";

  if (image.tags) {
    str += image.tags.map((item) => item.name).join(",");
  }

  if (image.annotation) {
    str += "-" + image.annotation;
  }

  return str;
};

export const handleTime = (time: number) => {
  const [date, t] = new Date(time)
    .toLocaleString()
    .replace(/:\d+$/, "")
    .split(" ");

  return (
    date
      .split("/")
      .map((item) => (item.length === 1 ? "0" + item : item))
      .join("/") +
    " " +
    t
  );
};
