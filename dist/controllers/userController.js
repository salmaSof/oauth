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
// /src/controllers/userController.ts
const web3_1 = __importDefault(require("../common/web3"));
const logger_1 = __importDefault(require("../utils/logger"));
const userModel_1 = __importDefault(require("../models/userModel"));
class UserController {
    getUser(req, res, next) {
        userModel_1.default.findOne({
            _id: req.params.id
        })
            .populate('role', '-_id -__v')
            .then((user) => {
            if (user) {
                user.password = undefined;
                logger_1.default.info(" API Get user(" + user.userName + ")");
                res.status(200).json(user);
            }
            else {
                res.status(404).json("User " + req.params.id + " not found!");
            }
        })
            .catch((error) => {
            logger_1.default.error("error: " + error.message + " errorStack:" + error.stack);
            res.status(500).json({
                error: "Internal Server Error"
            });
            next(error);
        });
    }
    getUsers(req, res, next) {
        userModel_1.default.find()
            .populate('role', '-_id -__v')
            .sort({ createdAt: -1 })
            .select("-password")
            .select("-accessToken")
            .select("-CRSToken")
            .then((users) => {
            logger_1.default.info(" API Get list of users...");
            res.status(200).json(users);
        })
            .catch((error) => {
            logger_1.default.error("error: " + error.message + " errorStack:" + error.stack);
            res.status(500).json({
                error: "Internal Server Error"
            });
            next(error);
        });
    }
    updateUserById(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let params = {
                userName: req.body.userName,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                roleOfUser: req.body.roleOfUser,
                email: req.body.email,
                password: req.body.password,
                provider: req.body.provider,
                account: req.body.account
            };
            for (let prop in params)
                if (!params[prop])
                    delete params[prop];
            userModel_1.default.findOneAndUpdate({ _id: req.params.id }, params, { new: true })
                .populate('role', '-_id -__v')
                .then((user) => {
                if (user) {
                    logger_1.default.info(" API Update user(" + user.userName + ")");
                    //user.password = undefined,
                    res.status(200).json(user);
                }
                else {
                    res.status(404).json("User not found!");
                }
            })
                .catch((error) => {
                logger_1.default.error("error: " + error.message + " errorStack:" + error.stack);
                res.status(500).json({
                    error: "Internal Server Error"
                });
                next(error);
            });
        });
    }
    register(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let providerAccounts = yield web3_1.default(req.query.provider).eth.getAccounts();
            let allocated = null;
            userModel_1.default.find().select("account").then((registred) => {
                const users = registred.map(registred => registred.account);
                for (const account of providerAccounts) {
                    if (users.indexOf(account) == -1) {
                        allocated = account;
                        break;
                    }
                }
                if (!allocated) {
                    res.status(401).json("No available account");
                    return;
                }
                userModel_1.default.create({
                    userName: req.body.userName,
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    roleOfUser: req.body.roleOfUser,
                    email: req.body.email,
                    password: req.body.password,
                    provider: req.query.provider,
                    account: allocated
                })
                    .then((user) => __awaiter(this, void 0, void 0, function* () {
                    user.password = undefined;
                    logger_1.default.info("Register user: " + user.userName);
                    res.status(201).json(user);
                }))
                    .catch((error) => {
                    logger_1.default.error("error: " + error.message + " errorStack:" + error.stack);
                    res.status(500).json({
                        error: "Internal Server Error"
                    });
                    next(error);
                });
            });
        });
    }
    deleteUser(req, res, next) {
        userModel_1.default.findOneAndDelete({
            _id: req.params.id
        })
            .then((user) => {
            if (user) {
                logger_1.default.info(" API Delete user (" + user.userName + ")");
                res.status(202).json();
            }
            else {
                res.status(404).json("User " + req.params.id + " not found!");
            }
        })
            .catch((error) => {
            logger_1.default.error("error: " + error.message + " errorStack:" + error.stack);
            res.status(500).json({
                error: "Internal Server Error"
            });
            next(error);
        });
    }
    getUserByEmail(req, res, next) {
        userModel_1.default.findOne({ email: req.params.email })
            .populate('role', '-_id -__v')
            .then((user) => {
            if (user) {
                user.password = undefined;
                logger_1.default.info(" API Get user(" + user.userName + ")");
                res.status(200).json(user);
            }
            else {
                res.status(404).json("User email " + req.params.email + " not found!");
            }
        })
            .catch((error) => {
            logger_1.default.error("error: " + error.message + " errorStack:" + error.stack);
            res.status(500).json({
                error: "Internal Server Error"
            });
            next(error);
        });
    }
    getUserByUserName(req, res, next) {
        userModel_1.default.findOne({ userName: req.params.userName })
            .populate('role', '-_id -__v')
            .then((user) => {
            if (user) {
                user.password = undefined;
                logger_1.default.info(" API Get user(" + user.userName + ")");
                res.status(200).json(user);
            }
            else {
                res.status(404).json("User name " + req.params.userName + " not found!");
            }
        })
            .catch((error) => {
            logger_1.default.error("error: " + error.message + " errorStack:" + error.stack);
            res.status(500).json({
                error: "Internal Server Error"
            });
            next(error);
        });
    }
}
exports.default = new UserController();
