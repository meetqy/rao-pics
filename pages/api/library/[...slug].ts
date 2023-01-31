import express from "express";
import getConfig from "next/config";

export const config = {
  api: { externalResolver: true },
};

const handler = express();
const { serverRuntimeConfig } = getConfig();

handler.use(
  ["/api/library", "/library"],
  express.static("./public/library", {
    // 31536000 后面 '000' 会被吃掉、字符串也不行
    maxAge: serverRuntimeConfig.minimumCacheTTL * 1000,
  })
);

export default handler;
