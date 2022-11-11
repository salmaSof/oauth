// /utils/passport.ts

import User from '../models/userModel';
import { SECRETKEY, EXPIRESIN } from "../utils/env";
import passportJWT  from 'passport-jwt';
import LocalPassport  from 'passport-local'
var jwt = require('jsonwebtoken')

const passport = require('passport')
const LocalStrategy = LocalPassport.Strategy;
const JWTStrategy   = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
import logger from '../utils/logger';

// localLogin
const localLogin = new LocalStrategy({
        usernameField: 'userName',
        passwordField: 'password'
    }, 
    function (userName, password, done) {
        return User.findOne({userName})
           .populate('role', '-_id -__v')
           .then(user => {
               if (!user) {
                   logger.error('Local login, Incorrect username.')
                   return done(null, false, { message: 'Incorrect username.'});
               }
               if (!user.comparePassword(password)) {
                   logger.error('Local login, Incorrect password.')
                   return done(null, false, { message: 'Incorrect password.'});
               }
               let token = jwt.sign({_id: user._id}, SECRETKEY, { expiresIn: EXPIRESIN });
               user.accessToken = token

               logger.info(' Local logged In Successfully.')
               return done(null, user, { message: 'Logged In Successfully'});
          })
          .catch(err => done(err));
    }
);

// jwtLogin
const jwtOptions = {
    secretOrKey: SECRETKEY,
    //jwtFromRequest: ExtractJWT.fromHeader('x-access-token'), // if you want to use "x-access-token" header
    //jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken() // just add "Bearer " Before the "Authorization" header
    jwtFromRequest: ExtractJWT.fromHeader('authorization') 
     
}

const jwtLogin = new  JWTStrategy(jwtOptions, (jwtPayload, done)  => {
        return User.findById(jwtPayload._id)
            .then(user => {
                logger.debug('JWT used.')
                return done(null, user);
            })
            .catch(err => {
                logger.error('JWT login error.')
                return done(err, null);
            });
    }
);

// jwtAdmin
const jwtAdmin = new  JWTStrategy(jwtOptions, (jwtPayload, done)  => {
    return User.findById(jwtPayload._id)
        .then(user => {
            return done(null, user);
        }) .catch(err => {
            logger.error('JWT login error.')
            return done(err, null);
        });
}
);

passport.use('local', localLogin)
passport.use('jwt', jwtLogin)

export const jwtGuard = passport.authenticate("jwt", { session: false });
export const loginGuard = passport.authenticate("local", { session: false });
export default passport

