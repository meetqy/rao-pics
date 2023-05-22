import { t } from "../../trpc";
import { getByLibrary } from "./getByLibrary";

export const imageRouter = t.router({
  getByLibrary,
});
