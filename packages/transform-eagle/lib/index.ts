import * as dotenv from "dotenv";
import watchImage from "./image";

dotenv.config();

function main() {
  const { LIBRARY } = process.env;
  if (!LIBRARY) throw Error("LIBRARY is null!");
  watchImage(LIBRARY);
}

main();
