import { getPrisma } from "@/lib/prisma";

export default async function handler(req, res) {
  const prisma = getPrisma();

  const count = await prisma.image.count();

  const skip = Math.floor(Math.random() * count);

  const image = await prisma.image.findFirst({
    skip,
  });

  const prefix = `/library/${image.id}.info/${image.name}`;

  if (image.noThumbnail) {
    return res.redirect(`${prefix}.${image.ext}`);
  }

  return res.redirect(`${prefix}_thumbnail.png`);
}
