"use strict";
// /server.ts
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const errorhandler_1 = __importDefault(require("errorhandler"));
const https = __importStar(require("https"));
const fs = __importStar(require("fs"));
const db_1 = require("./models/db");
const app_1 = __importDefault(require("./app"));
const env_1 = require("./utils/env");
const logger_1 = __importDefault(require("./utils/logger"));
function startserver() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            logger_1.default.info(" Start Oauth server in mode " + env_1.ENVIRONMENT + " [SSL=" + env_1.SSL + "]");
            yield db_1.startDB();
            yield db_1.initDB();
            let serverMessage = " App is running at " + env_1.APP_URI + " in (" + app_1.default.get("env") + " mode). Swagger access: " + env_1.SWAGGER_URI + "  Press CTRL-C to stop server.";
            if (env_1.ENVIRONMENT !== "production")
                app_1.default.use(errorhandler_1.default());
            if (env_1.SSL) {
                if (!fs.existsSync("./keys/key.pem")) {
                    logger_1.default.error("key file does not exist (./keys/key.pem)");
                    process.exit(1);
                }
                const httpsOptions = {
                    key: fs.readFileSync('./keys/key.pem'),
                    cert: fs.readFileSync('./keys/cert.pem')
                };
                https.createServer(httpsOptions, app_1.default).listen(app_1.default.get("port"), () => {
                    logger_1.default.info(serverMessage);
                });
            }
            else {
                app_1.default.listen(app_1.default.get("port"), () => {
                    logger_1.default.info(serverMessage);
                });
            }
        }
        catch (error) {
            console.error(error);
            process.exit(1);
        }
    });
}
startserver();
