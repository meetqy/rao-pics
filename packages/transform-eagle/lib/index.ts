import * as dotenv from "dotenv";
import watchImage from "./image";
import watchFloder from "./floder";
import { logger } from "@eagleuse/utils";

dotenv.config();

function transfromEagle() {
  const { LIBRARY } = process.env;
  if (!LIBRARY) throw Error("LIBRARY is null!");

  logger.info("Start transform 🛫");

  watchFloder(LIBRARY);
  watchImage(LIBRARY);
}

export default transfromEagle;
