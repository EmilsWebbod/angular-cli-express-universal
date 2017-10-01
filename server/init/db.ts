
import {Config} from '../config';

const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');

export = (app) => {
  console.log('Initializing Database');
  /**
   * INIT Mongoose
   */
  mongoose.connect(Config.mongo_db);
  mongoose.connection.on('error', console.error.bind(console, 'connection error:'));
  autoIncrement.initialize(mongoose.connection);
  console.log('DB Done');
};
