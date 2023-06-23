import { t } from "../../trpc";
import { get } from "./get";

export const image = t.router({
  get,
});
