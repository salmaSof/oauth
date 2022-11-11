"use strict";
// /src/routes/authRoutes.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController_1 = __importDefault(require("../controllers/authController"));
exports.authRouter = express_1.default.Router();
exports.authRouter.route('/sign_in').post(authController_1.default.sign_in);
