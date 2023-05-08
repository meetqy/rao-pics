/* eslint-disable */
import raopics from "@raopics/use";
import * as dotenv from "dotenv";

dotenv.config();

const { LIBRARY, PORT } = process.env;

raopics({
  library: LIBRARY,
  port: PORT,
});
