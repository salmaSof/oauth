"use strict";
// /utils/logger.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = __importDefault(require("winston"));
const env_1 = require("./env");
var appRoot = require('app-root-path');
const logger = winston_1.default.createLogger({
    level: env_1.LOGLEVEL,
    transports: [
        new winston_1.default.transports.Console({
            format: winston_1.default.format.simple(),
            level: env_1.LOGLEVEL,
            handleExceptions: true
        })
    ]
});
if (env_1.LOGFILE) {
    logger.add(new winston_1.default.transports.File({
        format: winston_1.default.format.simple(),
        filename: `${appRoot}/logs/app.log`,
        level: env_1.LOGLEVEL
    }));
}
exports.default = logger;
