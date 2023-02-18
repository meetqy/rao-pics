import { PrismaClient } from "@prisma/client";
import { join } from "path";
import getNSFWTag from "@/scripts/nsfw";
import logger from "@/utils/logger";
import ProgressBar from "progress";

function handleTagGroup(prisma: PrismaClient) {
  return new Promise((reslove, reject) => {
    prisma.tagsGroups
      .findUnique({
        where: {
          name: "NSFW",
        },
      })
      .then((tag) => {
        const id = (tag && tag.id) || "NSFW";

        const nsfwData = {
          id: id,
          name: "NSFW",
          color: "red",
          tags: {
            connectOrCreate: [
              "Hentai",
              "Drawing",
              "Porn",
              "Neutral",
              "Sexy",
            ].map((tag) => ({
              where: {
                id: tag,
              },
              create: {
                name: tag,
                id: tag,
              },
            })),
          },
        };

        prisma.tagsGroups
          .upsert({
            where: {
              id: id,
            },
            create: nsfwData,
            update: nsfwData,
          })
          .then(reslove)
          .catch(reject);
      })
      .catch(reject);
  });
}

const handleImage = async (prisma: PrismaClient, trigger: () => void) => {
  const notNSFW = await prisma.image.findMany({
    where: {
      NOT: {
        nsfw: true,
      },
    },
    include: {
      tags: true,
    },
  });

  if (notNSFW.length < 1) return logger.info("no image to check nsfw.");

  const bar = new ProgressBar(`loading [:bar] :current/:total :percent :etas`, {
    total: notNSFW.length,
    width: 50,
    complete: "#",
  });

  for (const image of notNSFW) {
    const file = join(
      process.env.LIBRARY,
      `./images/${image.id}.info/${image.name}.${image.ext}`
    );

    const nsfwTags = await getNSFWTag(file);

    await prisma.image.update({
      where: {
        id: image.id,
      },
      data: {
        nsfw: true,
        tags: {
          connectOrCreate: image.tags
            .map((item) => item.id)
            .concat(nsfwTags)
            .map((tag) => ({
              where: { id: tag },
              create: { id: tag, name: tag },
            })),
        },
      },
    });
    bar.tick();
    trigger();

    if (bar.complete) {
      logger.info(`complete! NSFW count: ${notNSFW.length}`);
    }
  }
};

async function initNSFW(prisma: PrismaClient, trigger: () => void) {
  await handleTagGroup(prisma);
  logger.info("success! init nsfw Tags and TagsGroups.");
  handleImage(prisma, trigger);
}

export default initNSFW;
