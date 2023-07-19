import { t } from "../../trpc";
import { get } from "./get";
import { groupByFieldCount } from "./groupBy";

export const image = t.router({
  get,
  groupByFieldCount,
});
