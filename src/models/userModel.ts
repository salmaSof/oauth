// /src/models/userModel.ts

import { Document, Schema, model, Error} from 'mongoose';
import validator from 'validator';
const bcrypt = require('bcryptjs');
var SALT_WORK_FACTOR=10;


export interface IUserModel extends Document {
  createdAt ? : Date
  updatedAt ? : Date
  userName: String
  firstName: String
  lastName: String
  roleOfUser: String
  email: String
  password: String
  provider: String
  account: String
  accessToken ? : String
  comparePassword
}

const UserSchema = new Schema({
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
            return validator.isEmail(email);
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
},{
  collection: 'usermodels',
  versionKey: false

}).pre('save', function (next) {
  const user = <IUserModel>this;

  if (user) {
      const now: Date = new Date();
      if (!user.createdAt) {
        user.createdAt = now;
        user.updatedAt = now;
      }
  }
  
  if (!user.isModified("password")) { return next(); }
  bcrypt.hash(user.password, SALT_WORK_FACTOR, (err: Error, hash: String) => {
      if (err) { return next(err); }
      user.password = hash;
      next();
  });
}).pre('findOneAndUpdate', function (next) {
  const user = <any>this;
  if (user) {
    user._update.updatedAt = new Date();
  }

  if (user._update.password === undefined){ return next(); }
  bcrypt.hash(user._update.password, SALT_WORK_FACTOR, (err: Error, hash: String) => {
    if (err) { return next(err); }
    user._update.password = hash;
    next();
  });
})

UserSchema.methods.comparePassword = function(password:String){
  const user = <IUserModel>this;
  return bcrypt.compareSync(password, user.password);
}

export default model<IUserModel>('UserModel', UserSchema);

