import raopics from "@raopics/use";

// eslint-disable-next-line no-undef
const { LIBRARY, PORT } = process.env;
raopics({
  library: LIBRARY,
  port: PORT,
});
