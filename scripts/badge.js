const w = "%20%7C%20";

const a = {
  video: ["mp4", "avi", "mov", "wmv", "flv", "webm", "mkv"].map((item) => item.toUpperCase()),
  image: ["jpg", "png", "jpeg", "gif", "webp"].map((item) => item.toUpperCase()),
};

// const video = `https://img.shields.io/badge/image-${a.video.join("%20%7C%20")}-brightgreen.svg`;

for (const k in a) {
  const v = a[k];
  console.log(`![supported ${v.join(" ")}](https://img.shields.io/badge/${k.toUpperCase()}-${v.join(w)}-brightgreen.svg)\n`);
}
