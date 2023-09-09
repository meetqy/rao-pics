import Image from "next/image";
import type { RenderSlideProps, SlideImage } from "yet-another-react-lightbox";
import {
  isImageFitCover,
  isImageSlide,
  useLightboxProps,
} from "yet-another-react-lightbox";

function isNextJsImage(slide: SlideImage) {
  return (
    isImageSlide(slide) &&
    typeof slide.width === "number" &&
    typeof slide.height === "number"
  );
}

export default function LightboxImage({ slide, rect }: RenderSlideProps) {
  const { imageFit } = useLightboxProps().carousel;
  const cover = isImageSlide(slide) && isImageFitCover(slide, imageFit);

  if (!isNextJsImage(slide)) return undefined;

  const { width: slideWidth = 1, height: slideHeight = 1 } = slide;

  const width = !cover
    ? Math.round(Math.min(rect.width, (rect.height / slideHeight) * slideWidth))
    : rect.width;

  const height = !cover
    ? Math.round(Math.min(rect.height, (rect.width / slideWidth) * slideHeight))
    : rect.height;

  return (
    <div style={{ position: "relative", width, height }}>
      <Image
        fill
        alt=""
        src={{
          src: slide.src,
          width: slideWidth,
          height: slideHeight,
          blurDataURL: `/_next/image?url=${slide.src}&w=12&q=1`,
        }}
        loading="lazy"
        draggable={false}
        style={{ objectFit: cover ? "cover" : "contain" }}
        placeholder="blur"
        sizes={`${Math.ceil((width / window.innerWidth) * 100)}vw`}
      />
    </div>
  );
}
