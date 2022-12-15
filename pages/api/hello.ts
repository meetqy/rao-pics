import { NextApiRequest, NextApiResponse } from "next";

/**
 * @openapi
 * /api/hello:
 *   get:
 *     description: Welcome to swagger-jsdoc!
 *     responses:
 *       200:
 *         description: Returns a mysterious string.
 */
const handler = (_req: NextApiRequest, res: NextApiResponse) => {
  res.status(200).json({
    result: "hello world",
  });
};

export default handler;
