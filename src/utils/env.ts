// /utils/env.ts

import dotenv from "dotenv";
import fs from "fs";
import { API_URI } from './constants'

if (fs.existsSync(".env")) {
    console.log("info:  Using .env file to supply config environment variables");
    dotenv.config({ path: ".env" });
} else {
    console.log("info:  Using environment variables for configuration.");
}

export const LOGFILE = process.env.LOG_FILE === "true" ? true : false;
export const SSL =  process.env.OAUTH_SSL === "true" ? true : false;
const PROTOCOL = process.env.OAUTH_SSL === "true" ? "https://" : "http://";

export const ENVIRONMENT = process.env.NODE_ENV;

var MONGODBURI = 'mongodb://' + process.env["OAUTH_DB_ADDRESS"]+':'+process.env["OAUTH_DB_PORT"]
if (ENVIRONMENT === 'test') {
    MONGODBURI = MONGODBURI + '/authdb_test'
}else if (ENVIRONMENT === 'dev') {
    MONGODBURI = MONGODBURI + '/authdb_dev'
}else  {
    MONGODBURI = MONGODBURI + '/authdb'
}

export const MONGODB_URI = MONGODBURI;
export const DEFAULTPORT = 4000;
export const LOGLEVEL    = process.env.LOG_LEVEL;
export const EXPIRESIN   = process.env.EXPIRESIN;
export const SECRETKEY   = process.env.SECRETKEY;
export const SRV_PORT    = process.env.OAUTH_PORT;
export const SRV_ADDRESS = process.env.OAUTH_ADDRESS;
export const APP_URI     = PROTOCOL+SRV_ADDRESS+":"+SRV_PORT+API_URI;
export const SWAGGER     = API_URI+'/api-docs';
export const SWAGGER_URI = APP_URI+'/api-docs';
export const DEFAULT_ADMIN_NAME      = process.env.OAUH_ADMIN_NAME;
export const DEFAULT_ADMIN_ID        = process.env.DEFAULT_ADMIN_ID;
export const DEFAULT_ADMIN_FIRSTNAME = process.env.OAUTH_ADMIN_FIRSTNAME;
export const DEFAULT_ADMIN_LASTNAME  = process.env.OAUTH_ADMIN_LASTNAME;
export const DEFAULT_ADMIN_ROLE  = process.env.OAUTH_ADMIN_ROLE;
export const DEFAULT_ADMIN_PWD       = process.env.OAUTH_ADMIN_PWD;
export const DEFAULT_ADMIN_EMAIL     = process.env.OAUTH_ADMIN_EMAIL;
export const DEFAULT_ADMIN_PROVIDER     = process.env.OAUTH_ADMIN_PROVIDER;
export const DEFAULT_ADMIN_ACCOUNT     = process.env.OAUTH_ADMIN_ACCOUNT;
