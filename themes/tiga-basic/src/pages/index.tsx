import { useState } from "react";
import Image from "next/image";
import type { RenderPhotoProps } from "react-photo-album";
import { PhotoAlbum } from "react-photo-album";
import Lightbox from "yet-another-react-lightbox";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Slideshow from "yet-another-react-lightbox/plugins/slideshow";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";

import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";

import LightboxImage from "~/components/LightboxImage";
import { trpc } from "~/utils/trpc";

export function NextJsImage({
  photo,
  imageProps: { alt, title, sizes, className, onClick },
  wrapperStyle,
}: RenderPhotoProps) {
  return (
    <div style={{ ...wrapperStyle, position: "relative" }}>
      <Image
        fill
        src={photo}
        draggable={false}
        placeholder={"blur"}
        {...{ alt, title, sizes, className, onClick }}
      />
    </div>
  );
}

export default function Home() {
  const [index, setIndex] = useState(-1);

  const imageQuery = trpc.image.get.useQuery();
  const { data: config } = trpc.config.get.useQuery();

  const data = imageQuery.data?.data;

  const photos = data?.map((image) => {
    const id = image.path.split("/").slice(-2)[0];
    const src = `http://${config?.ip}:${config?.staticServerPort}/${id}/${image.name}.${image.ext}`;

    return {
      src,
      blurDataURL: `/_next/image?url=${src}&w=128&q=1`,
      width: image.width,
      height: image.height,
    };
  });

  return photos ? (
    <>
      <PhotoAlbum
        sizes={{
          size: "calc(100vw - 240px)",
          sizes: [{ viewport: "(max-width: 960px)", size: "100vw" }],
        }}
        layout="columns"
        photos={photos}
        renderPhoto={NextJsImage}
        onClick={({ index }) => setIndex(index)}
      />

      <Lightbox
        slides={photos}
        open={index >= 0}
        index={index}
        close={() => setIndex(-1)}
        // enable optional lightbox plugins
        plugins={[Fullscreen, Slideshow, Thumbnails]}
        render={{ slide: LightboxImage }}
      />
    </>
  ) : null;
}
