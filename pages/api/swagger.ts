import { readJSONSync } from "fs-extra";
import swaggerJsdoc from "swagger-jsdoc";

const pkg = readJSONSync("./package.json");

export default function handler(_req, res) {
  res.status(200).json(
    swaggerJsdoc({
      definition: {
        openapi: "3.0.0",
        info: {
          title: "EagleUse",
          version: pkg.version,
        },
      },
      apis: ["./pages/api/**/*.ts"],
    })
  );
}
