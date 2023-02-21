import * as dotenv from "dotenv";
import watchImage from "./images";

dotenv.config();

function main() {
  const { LIBRARY } = process.env;
  if (!LIBRARY) throw Error("LIBRARY is null!");
  watchImage(LIBRARY);
}

main();
