// /utils/logger.ts

import winston from "winston";
import { LOGLEVEL, LOGFILE} from "./env";
var appRoot = require('app-root-path');

const logger = winston.createLogger({
    level:LOGLEVEL,
    transports: [
      new winston.transports.Console({
        format: winston.format.simple(),
        level: LOGLEVEL,
        handleExceptions: true
      })
    ]
  });
  if (LOGFILE) {
    logger.add(new winston.transports.File ({ 
      format: winston.format.simple(),
      filename: `${appRoot}/logs/app.log`, 
      level: LOGLEVEL}))
  }

export default logger;
