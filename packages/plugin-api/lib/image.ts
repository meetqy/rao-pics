import { getPrisma } from "@eagleuse/prisma-client";
import express from "express";
import { handleInclude, handleOrderBy } from "./utils";

const router = express.Router();
const prisma = getPrisma();

BigInt.prototype["toJSON"] = function () {
  return Number(this);
};

/**
 * @include _count,tags,folders  eg: include=tags,folders
 * @orderBy image filed: asc|desc  eg: orderBy=btime,asc
 * @pageSize
 * @page
 */
router.get("/image", async (req, res) => {
  const { include, orderBy } = req.query;
  const page = Number(req.query.page || 1);
  const pageSize = Number(req.query.pageSize || 50);

  try {
    const result = await prisma.image.findMany({
      where: {},
      include: handleInclude(include as string),
      skip: (page - 1) * pageSize,
      take: pageSize,
      orderBy: handleOrderBy(orderBy as string),
    });

    res.json(result);
  } catch (e) {
    res.json({
      code: 400,
      message: e.message,
    });
  }
});

router.get("/image/:id", async (req, res) => {
  const { id } = req.params;
  const { include } = req.query;

  try {
    const result = await prisma.image.findUnique({
      where: {
        id,
      },
      include: handleInclude(include as string),
    });

    res.json(result);
  } catch (e) {
    res.json({
      code: 400,
      message: e.message,
    });
  }
});

export default router;
