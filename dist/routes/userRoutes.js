"use strict";
// /src/routes/userRoutes.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = __importDefault(require("../controllers/userController"));
const passport_1 = require("../utils/passport");
exports.userRouter = express_1.default.Router();
exports.userRouter.route('').post(passport_1.jwtGuard, userController_1.default.register);
exports.userRouter.route('/:id').get(passport_1.jwtGuard, userController_1.default.getUser);
exports.userRouter.route('/getUserByUserName/:userName').get(passport_1.jwtGuard, userController_1.default.getUserByUserName);
exports.userRouter.route('/getUserByEmail/:email').get(passport_1.jwtGuard, userController_1.default.getUserByEmail);
exports.userRouter.route('/:id').delete(passport_1.jwtGuard, userController_1.default.deleteUser);
exports.userRouter.route('/:id').put(passport_1.jwtGuard, userController_1.default.updateUserById);
exports.userRouter.route('').get(passport_1.jwtGuard, userController_1.default.getUsers);
