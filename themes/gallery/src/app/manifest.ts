import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Gallery 主题",
    short_name: "Gallery",
    description: "RAO.PICS 默认主题",
    start_url: "/",
    display: "standalone",
    icons: [
      {
        src: "/icon_192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon_512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
