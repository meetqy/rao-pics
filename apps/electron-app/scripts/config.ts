import fs from "fs";

const Pkg = JSON.parse(fs.readFileSync("../../package.json", "utf-8")) as Record<string, unknown>;

const toPascalCase = (str: string) =>
  str
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

const name = toPascalCase(Pkg.name as string);

export const config = {
  name,
  version: Pkg.version as string,
};
