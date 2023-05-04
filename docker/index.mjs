/* eslint-disable */
import raopics from "@raopics/use";

const { LIBRARY, PORT } = process.env;

raopics({
  library: LIBRARY,
  port: PORT,
});
