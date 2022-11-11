"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
// /src/models/db.ts
const mongoose_1 = __importDefault(require("mongoose"));
const userModel_1 = __importDefault(require("./userModel"));
const env_1 = require("../utils/env");
const logger_1 = __importDefault(require("../utils/logger"));
function startDB() {
    const mongoUrl = env_1.MONGODB_URI;
    logger_1.default.info(" URL MongoDB=" + mongoUrl);
    mongoose_1.default.connect(mongoUrl, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }, (err) => {
        if (!err) {
            logger_1.default.info(" Successfully connected to MongoDB: " + mongoUrl);
        }
        else {
            logger_1.default.error(err.message);
            process.exit(1);
        }
    });
}
exports.startDB = startDB;
exports.wait = ms => new Promise((r, j) => setTimeout(r, ms));
function initDB() {
    return __awaiter(this, void 0, void 0, function* () {
        yield createAdmin();
    });
}
exports.initDB = initDB;
function createAdmin() {
    return __awaiter(this, void 0, void 0, function* () {
        let count = yield userModel_1.default.estimatedDocumentCount().exec();
        if (count === 0) {
            logger_1.default.info(" Create initial ADMIN account");
            let userData = {
                //_id: mongoose.Types.ObjectId(DEFAULT_ADMIN_ID),
                userName: env_1.DEFAULT_ADMIN_NAME,
                firstName: env_1.DEFAULT_ADMIN_FIRSTNAME,
                lastName: env_1.DEFAULT_ADMIN_LASTNAME,
                roleOfUser: env_1.DEFAULT_ADMIN_ROLE,
                email: env_1.DEFAULT_ADMIN_EMAIL,
                password: env_1.DEFAULT_ADMIN_PWD,
                provider: env_1.DEFAULT_ADMIN_PROVIDER,
                account: env_1.DEFAULT_ADMIN_ACCOUNT
            };
            yield userModel_1.default.create(userData, (err, user) => {
                if (err) {
                    return logger_1.default.error(err.stack);
                }
            });
        }
        else {
            logger_1.default.info(" ADMIN account already exist!");
        }
    });
}
