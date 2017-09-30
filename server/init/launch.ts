
import {Utils} from '../utils/utils';
import {Config} from '../config';

const http = require('http');
const cluster = require('cluster');
const debug = require('debug')('www.deskvibe.co:server');

module.exports = app => {

  console.log('Initializing Server');
  const port = Utils.normalizePort(process.env.PORT || Config.port || '3000');
  const server = http.createServer(app);
  const numCPUs = process.env.WEB_CONCURRENCY || require('os').cpus().length;

  app.set('port', port);

  /**
   * Listen on provided port, on all network interfaces.
   */
  if (cluster.isMaster && app.get('env') !== 'development') {
    // Fork workers.
    for (let i = 0; i < numCPUs; i++) {
      cluster.fork();
    }

    cluster.on('exit', function(worker, code, signal) {
      console.log('worker ' + worker.process.pid + ' died');
    });
  } else {
    server.listen(port);
    server.on('error', onError);
    server.on('listening', onListening);
  }

  console.log('Listening on port: ' + port);

  /**
   * Event listener for HTTP server "error" event.
   */

  function onError(error) {
    if (error.syscall !== 'listen') {
      throw error;
    }

    const bind = typeof port === 'string'
      ? 'Pipe ' + port
      : 'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
      case 'EACCES':
        console.error(bind + ' requires elevated privileges');
        process.exit(1);
        break;
      case 'EADDRINUSE':
        console.error(bind + ' is already in use');
        process.exit(1);
        break;
      default:
        throw error;
    }
  }

  /**
   * Event listener for HTTP server "listening" event.
   */

  function onListening() {
    const addr = server.address();
    const bind = typeof addr === 'string'
      ? 'pipe ' + addr
      : 'port ' + addr.port;
    debug('Listening on ' + bind);
  }

  console.log('Server Started');
};
