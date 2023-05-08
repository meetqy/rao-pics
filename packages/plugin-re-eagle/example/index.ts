import PLUGIN_RE_EAGLE from "../lib";
import * as dotenv from "dotenv";

const { LIBRARY } = process.env;

dotenv.config();

PLUGIN_RE_EAGLE(LIBRARY);
