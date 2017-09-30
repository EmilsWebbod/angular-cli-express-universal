
import * as mongoose from 'mongoose';
import * as passportLocalMongoose from 'passport-local-mongoose';
import {Handler} from '../utils/handler';
const _ = require('ramda');

const Schema = mongoose.Schema;

export interface IUserModel {
  _id?: string;
  username: string;
  created?: Date;
  initUser: {username: string};
}

const userSchema = new Schema({
  username: {
    type: String,
    index: true,
    required: true,
    unique: true,
    minLength: 2,
    set: _.toLower
  },
  created: {type: Date, default: Date.now()}
});

userSchema.plugin(passportLocalMongoose, {
  attemptsField: true,
  lastLoginField: true,
  usernameLowerCase: true,
  /*limitAttempts: true,*/
  maxAttempts: 25
});

export const User = mongoose.model<IUserModel>('user', userSchema);

User.initUser = name => new User({username: name});

User.test = function() {
  return new Promise((res, rej) => {
    rej( Handler.modelError('test')({test: 'test'}) );
  });
};
