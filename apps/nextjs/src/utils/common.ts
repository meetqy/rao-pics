import { type Image } from "@acme/db";

export const getImgUrl = (img: Image) => {
  const imgName = img.noThumbnail ? `${img.name}.${img.ext}` : `${img.name}_thumbnail.png`;
  return `${process.env["NEXT_PUBLIC_API_URL"]}/${img.libraryId}/${img.id}.info/${imgName}`;
};
