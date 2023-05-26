import { t } from "../../trpc";
import { get } from "./get";

export const imageRouter = t.router({
  get,
});
