
import {Config} from '../config';

const session       = require('express-session');
const Redis         = require('connect-redis')(session);

export = app => {
  console.log('Initializing Session');
  /**
   * Set up Session
   */
  app.use(session({
    secret: Config.cookie_secret,
    store: new Redis({ url: Config.redis_url }),
    resave: true,
    saveUninitialized: true
  }));
  console.log('Session Done');
};
