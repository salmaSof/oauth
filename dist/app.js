"use strict";
// /app.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = require("body-parser");
const userRoutes_1 = require("./routes/userRoutes");
const authRoutes_1 = require("./routes/authRoutes");
const env_1 = require("./utils/env");
const constants_1 = require("./utils/constants");
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_json_1 = __importDefault(require("./swagger/swagger.json"));
const logger_1 = __importDefault(require("./utils/logger"));
var path = require('path');
var passport = require('passport');
// Load environment variables from .env file
dotenv_1.default.config({ path: ".env" });
process.env.NODE_ENV = env_1.ENVIRONMENT;
// Create Express server
const app = express_1.default();
app.use(passport.initialize());
// Express configuration
app.use(cors_1.default());
app.use(body_parser_1.urlencoded({ extended: true }));
app.use(body_parser_1.json());
app.set('port', env_1.SRV_PORT || env_1.DEFAULTPORT);
app.use(express_1.default.static(path.join(__dirname, 'public')));
app.use(constants_1.API_URI + '/users', userRoutes_1.userRouter);
app.use(constants_1.API_URI + '/auth', authRoutes_1.authRouter);
app.use(env_1.SWAGGER, swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_json_1.default));
app.get('/' + constants_1.APP_NAME + '/version', function (req, res, next) {
    logger_1.default.info(" API getVersion used -> " + constants_1.APP_VERSION);
    return res.json(constants_1.APP_VERSION);
});
exports.default = app;
