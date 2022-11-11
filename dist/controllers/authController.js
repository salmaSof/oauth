"use strict";
// /src/controllers/authController.ts
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
const passport_1 = __importDefault(require("../utils/passport"));
class AuthController {
    sign_in(req, res, next) {
        passport_1.default.authenticate('local', { session: false }, (err, user, info) => {
            if (err || !user) {
                return res.status(401).json({
                    message: 'Authentication failed. Wrong password.',
                    user: user
                });
            }
            req.login(user, { session: false }, (err) => __awaiter(this, void 0, void 0, function* () {
                if (err) {
                    res.send(err);
                }
                user.password = undefined;
                return res.json(user);
            }));
        })(req, res);
    }
}
exports.default = new AuthController();
