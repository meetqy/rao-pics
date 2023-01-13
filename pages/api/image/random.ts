import prisma from "@/lib/prisma";

export default async function handler(req, res) {
  const count = await prisma.image.count();

  const skip = Math.floor(Math.random() * count);

  const image = await prisma.image.findFirst({
    skip,
  });

  const proto =
    req.headers["x-forwarded-proto"] || req.connection.encrypted
      ? "https"
      : "http";
  const host = proto + "://" + req.headers.host;

  const prefix = `${host}/library/${image.id}.info/${image.name}`;

  if (image.noThumbnail) {
    return res.redirect(`${prefix}.${image.ext}`);
  }

  return res.redirect(`${prefix}_thumbnail.png`);
}
