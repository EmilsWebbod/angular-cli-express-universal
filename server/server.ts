
require('zone.js');
require('reflect-metadata');
require('rxjs/Rx');

const express = require('express');
const app = express();

/** Render engine and SSR */
require('./init/render')(app);

/** All extra that is built upon express */
require('./init/use')(app);

/** Init Session and Redis */
require('./init/session')(app);

/** Init DB */
require('./init/db')(app);

/** Init Passport login */
require('./init/passport')(app);

/** Load api and all the routes */
app.use('/api', require('./routes/api'));
app.use('/api/user', require('./routes/user'));
app.use('/', require('./routes/index'));

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  console.log(err);
  res.status(err.status || 500);
});

/** Finally set up server for launch and start */
require('./init/launch')(app);

export = app;
