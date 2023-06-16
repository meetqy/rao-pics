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

  const grid = GridScreens[res as keyof typeof GridScreens];

  return {
    responsiveKey: res,
    gridOption: grid,
  };
};

export const GridScreens = {
  // 0-640: sm
  sm: ["grid-cols-1", "grid-cols-2", "grid-cols-3"],
  // 641-768: md
  md: ["grid-cols-3", "grid-cols-2", "grid-cols-1"],
  // 769-1024: lg
  lg: ["grid-cols-3", "grid-cols-4", "grid-cols-6"],
  // 1025-1280: xl
  xl: ["grid-cols-3", "grid-cols-4", "grid-cols-6"],
  // 1281-1536: 2xl
  xxl: ["grid-cols-6", "grid-cols-8", "grid-cols-12"],
};

export const GridScreensConfig: Record<string, Record<string, { body: boolean; gap: string; p: string }>> = {
  xxl: {
    "6": { body: true, gap: "gap-4", p: "p-4" },
    "8": { body: false, gap: "gap-4", p: "p-4" },
    "12": { body: false, gap: "gap-3", p: "p-3" },
  },
  xl: {
    "3": { body: true, gap: "gap-4", p: "p-4" },
    "4": { body: true, gap: "gap-3", p: "p-3" },
    "6": { body: false, gap: "gap-3", p: "p-3" },
  },
  lg: {
    "3": { body: true, gap: "gap-3", p: "p-3" },
    "4": { body: true, gap: "gap-2", p: "p-2" },
    "6": { body: false, gap: "gap-3", p: "p-3" },
  },
  md: {
    "1": { body: true, gap: "gap-4", p: "p-4" },
    "2": { body: true, gap: "gap-3", p: "p-3" },
    "3": { body: false, gap: "gap-3", p: "p-3" },
  },
  sm: {
    "1": { body: true, gap: "gap-4", p: "p-4" },
    "2": { body: true, gap: "gap-3", p: "p-2" },
    "3": { body: false, gap: "gap-2", p: "p-2" },
  },
};
