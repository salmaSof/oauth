"use strict";
// /src/models/userModel.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const validator_1 = __importDefault(require("validator"));
const bcrypt = require('bcrypt');
var SALT_WORK_FACTOR = 10;
const UserSchema = new mongoose_1.Schema({
    userName: {
        type: String,
        unique: true,
        trim: true,
        required: true
    },
    firstName: {
        type: String,
        trim: true,
        required: true
    },
    lastName: {
        type: String,
        trim: true,
        required: true
    },
    roleOfUser: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'Email is required!'],
        trim: true,
        validate: {
            validator(email) {
                return validator_1.default.isEmail(email);
            },
            message: '{VALUE} is not a valid email!',
        }
    },
    provider: {
        type: String,
        trim: true,
        required: true
    },
    account: {
        type: String,
        trim: true,
        required: true
    },
    password: {
        type: String,
        required: [true, 'Password is required!'],
        //select: false,
        trim: true,
        minlength: [6, 'Password need to be longer!'],
    },
    accessToken: {
        type: String,
    },
    createdAt: {
        type: Date
    },
    updatedAt: {
        type: Date
    }
}, {
    collection: 'usermodels',
    versionKey: false
}).pre('save', function (next) {
    const user = this;
    if (user) {
        const now = new Date();
        if (!user.createdAt) {
            user.createdAt = now;
            user.updatedAt = now;
        }
    }
    if (!user.isModified("password")) {
        return next();
    }
    bcrypt.hash(user.password, SALT_WORK_FACTOR, (err, hash) => {
        if (err) {
            return next(err);
        }
        user.password = hash;
        next();
    });
}).pre('findOneAndUpdate', function (next) {
    const user = this;
    if (user) {
        user._update.updatedAt = new Date();
    }
    if (user._update.password === undefined) {
        return next();
    }
    bcrypt.hash(user._update.password, SALT_WORK_FACTOR, (err, hash) => {
        if (err) {
            return next(err);
        }
        user._update.password = hash;
        next();
    });
});
UserSchema.methods.comparePassword = function (password) {
    const user = this;
    return bcrypt.compareSync(password, user.password);
};
exports.default = mongoose_1.model('UserModel', UserSchema);
