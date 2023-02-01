import pino from "pino";
import pretty from "pino-pretty";

const logger = pino(pretty());

export default logger;
