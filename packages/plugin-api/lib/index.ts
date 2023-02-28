import { logger } from "@eagleuse/utils";
import express from "express";
import imageRouter from "./image";

const PLUGIN_API = () => {
  const app = express();

  app.use(imageRouter);

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    logger.info(`Visit: http://localhost:${PORT}`);
  });
};

export default PLUGIN_API;
