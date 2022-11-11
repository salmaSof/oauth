"use strict";
// /utils/passport.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userModel_1 = __importDefault(require("../models/userModel"));
const env_1 = require("../utils/env");
const passport_jwt_1 = __importDefault(require("passport-jwt"));
const passport_local_1 = __importDefault(require("passport-local"));
var jwt = require('jsonwebtoken');
const passport = require('passport');
const LocalStrategy = passport_local_1.default.Strategy;
const JWTStrategy = passport_jwt_1.default.Strategy;
const ExtractJWT = passport_jwt_1.default.ExtractJwt;
const logger_1 = __importDefault(require("../utils/logger"));
// localLogin
const localLogin = new LocalStrategy({
    usernameField: 'userName',
    passwordField: 'password'
}, function (userName, password, done) {
    return userModel_1.default.findOne({ userName })
        .populate('role', '-_id -__v')
        .then(user => {
        if (!user) {
            logger_1.default.error('Local login, Incorrect username.');
            return done(null, false, { message: 'Incorrect username.' });
        }
        if (!user.comparePassword(password)) {
            logger_1.default.error('Local login, Incorrect password.');
            return done(null, false, { message: 'Incorrect password.' });
        }
        let token = jwt.sign({ _id: user._id }, env_1.SECRETKEY, { expiresIn: env_1.EXPIRESIN });
        user.accessToken = token;
        logger_1.default.info(' Local logged In Successfully.');
        return done(null, user, { message: 'Logged In Successfully' });
    })
        .catch(err => done(err));
});
// jwtLogin
const jwtOptions = {
    secretOrKey: env_1.SECRETKEY,
    //jwtFromRequest: ExtractJWT.fromHeader('x-access-token'), // if you want to use "x-access-token" header
    //jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken() // just add "Bearer " Before the "Authorization" header
    jwtFromRequest: ExtractJWT.fromHeader('authorization')
};
const jwtLogin = new JWTStrategy(jwtOptions, (jwtPayload, done) => {
    return userModel_1.default.findById(jwtPayload._id)
        .then(user => {
        logger_1.default.debug('JWT used.');
        return done(null, user);
    })
        .catch(err => {
        logger_1.default.error('JWT login error.');
        return done(err, null);
    });
});
// jwtAdmin
const jwtAdmin = new JWTStrategy(jwtOptions, (jwtPayload, done) => {
    return userModel_1.default.findById(jwtPayload._id)
        .then(user => {
        return done(null, user);
    }).catch(err => {
        logger_1.default.error('JWT login error.');
        return done(err, null);
    });
});
passport.use('local', localLogin);
passport.use('jwt', jwtLogin);
exports.jwtGuard = passport.authenticate("jwt", { session: false });
exports.loginGuard = passport.authenticate("local", { session: false });
exports.default = passport;
