
const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');

export = (app) => {
  console.log('Initializing Database');
  /**
   * INIT Mongoose
   */
  mongoose.connect(process.env.MONGODB_URI || 'mongodb://acc01:acc01@localhost/HourPlaner');
  mongoose.connection.on('error', console.error.bind(console, 'connection error:'));
  autoIncrement.initialize(mongoose.connection);
  console.log('DB Done');
};
