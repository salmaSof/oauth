"use strict";
// /utils/env.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const fs_1 = __importDefault(require("fs"));
const constants_1 = require("./constants");
if (fs_1.default.existsSync(".env")) {
    console.log("info:  Using .env file to supply config environment variables");
    dotenv_1.default.config({ path: ".env" });
}
else {
    console.log("info:  Using environment variables for configuration.");
}
exports.LOGFILE = process.env.LOG_FILE === "true" ? true : false;
exports.SSL = process.env.OAUTH_SSL === "true" ? true : false;
const PROTOCOL = process.env.OAUTH_SSL === "true" ? "https://" : "http://";
exports.ENVIRONMENT = process.env.NODE_ENV;
var MONGODBURI = 'mongodb://' + process.env["OAUTH_DB_ADDRESS"] + ':' + process.env["OAUTH_DB_PORT"];
if (exports.ENVIRONMENT === 'test') {
    MONGODBURI = MONGODBURI + '/authdb_test';
}
else if (exports.ENVIRONMENT === 'dev') {
    MONGODBURI = MONGODBURI + '/authdb_dev';
}
else {
    MONGODBURI = MONGODBURI + '/authdb';
}
exports.MONGODB_URI = MONGODBURI;
exports.DEFAULTPORT = 4000;
exports.LOGLEVEL = process.env.LOG_LEVEL;
exports.EXPIRESIN = process.env.EXPIRESIN;
exports.SECRETKEY = process.env.SECRETKEY;
exports.SRV_PORT = process.env.OAUTH_PORT;
exports.SRV_ADDRESS = process.env.OAUTH_ADDRESS;
exports.APP_URI = PROTOCOL + exports.SRV_ADDRESS + ":" + exports.SRV_PORT + constants_1.API_URI;
exports.SWAGGER = constants_1.API_URI + '/api-docs';
exports.SWAGGER_URI = exports.APP_URI + '/api-docs';
exports.DEFAULT_ADMIN_NAME = process.env.OAUH_ADMIN_NAME;
exports.DEFAULT_ADMIN_ID = process.env.DEFAULT_ADMIN_ID;
exports.DEFAULT_ADMIN_FIRSTNAME = process.env.OAUTH_ADMIN_FIRSTNAME;
exports.DEFAULT_ADMIN_LASTNAME = process.env.OAUTH_ADMIN_LASTNAME;
exports.DEFAULT_ADMIN_ROLE = process.env.OAUTH_ADMIN_ROLE;
exports.DEFAULT_ADMIN_PWD = process.env.OAUTH_ADMIN_PWD;
exports.DEFAULT_ADMIN_EMAIL = process.env.OAUTH_ADMIN_EMAIL;
exports.DEFAULT_ADMIN_PROVIDER = process.env.OAUTH_ADMIN_PROVIDER;
exports.DEFAULT_ADMIN_ACCOUNT = process.env.OAUTH_ADMIN_ACCOUNT;
