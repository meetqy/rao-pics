import { type Image } from "@acme/db";

export const getImgUrl = (img: Image) => {
  const imgName = img.noThumbnail ? `${img.name}.${img.ext}` : `${img.name}_thumbnail.png`;
  return `${process.env["NEXT_PUBLIC_API_URL"]}/${img.libraryId}/${img.id}.info/${imgName}`;
};

export const transformByteToUnit = (bytes = 0, decimals = 2) => {
  if (!+bytes) return "0 Bytes";

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
};
