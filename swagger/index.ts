import { writeJsonSync } from "fs-extra";
import { join } from "path";
import swaggerJsdoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Hello World",
      version: "1.0.0",
    },
  },
  apis: ["./pages/api/*.ts"], // files containing annotations as above
};

writeJsonSync(join(__dirname, "../public/swagger.json"), swaggerJsdoc(options));
