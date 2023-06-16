import { type Image } from "@acme/db";

export const getImgUrl = (prefix: string, img: Image, original = false) => {
  let imgName = img.noThumbnail ? `${img.name}.${img.ext}` : `${img.name}_thumbnail.png`;

  if (original) {
    imgName = `${img.name}.${img.ext}`;
  }

  return `${prefix}/${img.libraryId}/${img.id}.info/${imgName}`;
};

export const transformByteToUnit = (bytes = 0, decimals = 2) => {
  if (!+bytes) return "0 Bytes";

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
};

export const getGridOption = (responsive: { [key in string]: boolean }) => {
  let res = "";
  for (const k in responsive) {
    if (responsive[k]) res = k;
    else break;
  }

  return GridScreens[res as keyof typeof GridScreens];
};

export const GridScreens = {
  sm: ["grid-cols-1", "grid-cols-2"],
  md: ["grid-cols-2", "grid-cols-1", "grid-cols-3"],
  lg: ["grid-cols-3", "grid-cols-4", "grid-cols-6"],
  xl: ["grid-cols-3", "grid-cols-4", "grid-cols-6"],
  xxl: ["grid-cols-6", "grid-cols-8", "grid-cols-12"],
};
