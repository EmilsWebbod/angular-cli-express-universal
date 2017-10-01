
import {Utils} from '../utils/utils';
import {Files} from '../files';

const path        = require('path');
const morgan      = require('morgan');
const bodyParser  = require('body-parser');
const favicon     = require('serve-favicon');
const compression = require('compression');
const x_frame    = require('x-frame-options');
const connect_flash = require('connect-flash');

export = app => {
  console.log('Initializing Use addons');
  /**
   * Set Up Morgan Logger
   */
  if (Utils.isProduction()) {
    app.use(morgan('common', { skip: function(req, res) { return res.statusCode < 400; }, stream: path.join(__dirname, 'morgan.log') }));
  } else {
    app.use(morgan('dev'));
  }

  /**
   * Set Body Parser
   */
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));

  /**
   * Set Up Other stuff
   */
  app.use(favicon(Files.fromDist('favicon.ico')));
  app.use(compression());
  app.use(x_frame());
  app.use(connect_flash());
  console.log('Addons Done');
};
