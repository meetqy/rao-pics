import Image from "next/image";
import { handleImageAlt, handleImageUrl } from "@/utils";
import { CSSProperties, useMemo } from "react";
import { NSFWState } from "@/hooks/nsfw";
import { useRecoilState } from "recoil";
import _ from "lodash";

interface Props {
  image: EagleUse.Image;
  width?: number;
  height?: number;
  fill?: boolean | undefined;
  style?: CSSProperties | undefined;
}

const CustomImage = ({ image, width, height, fill, style }: Props) => {
  const [n] = useRecoilState(NSFWState);

  //   当前图片是否为nsfw
  const nsfw = useMemo(() => {
    return (image.tags || []).filter((t) => ["Hentai", "Porn", "Sexy"].includes(t.id)).map((item) => item.id);
  }, [image]);

  const _style = {
    ...style,
    filter: _.difference(nsfw, n).length > 0 ? "blur(16px)" : "inherit",
  };

  return (
    <Image
      fill={fill}
      style={_style}
      width={width}
      height={height}
      src={handleImageUrl(image)}
      alt={handleImageAlt(image)}
    />
  );
};

export default CustomImage;
