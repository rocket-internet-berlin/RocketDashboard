import express from 'express';
import path from 'path';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import http from 'http';
import chalk from 'chalk';
import apicache from 'apicache';
import config from './config/config';

import bugsHistory from './routes/bugsHistory';
import newRelicErrors from './routes/newRelicErrors';

const app = express();
const ROUTE_PREFIX = '/api';

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// cache management endpoints
app.get(`${ROUTE_PREFIX}/cache/index`, (req, res) => res.json(apicache.getIndex()));
app.get(`${ROUTE_PREFIX}/cache/clear`, (req, res) => res.json(apicache.clear()));

// Cache all routes. Note: cache could also be set-up per-route - see docs
app.use(apicache.middleware(config.globalEndpointCache));

// widget endpoints
app.use(`${ROUTE_PREFIX}/bugsHistory`, bugsHistory);
app.use(`${ROUTE_PREFIX}/newRelicErrors`, newRelicErrors);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send({
    status: 'error',
    message: 'Something went terribly wrong!',
  });
});

/**
 * Get port from environment and store in Express.
 */

const port = normalizePort(process.env.PORT || '3001');
app.set('port', port);

const protocol = process.env.HTTPS === 'true' ? 'https' : 'http';
const host = process.env.HOST || 'localhost';

console.log(chalk.cyan('Starting the Express server...'));

/**
 * Create HTTP server.
 */

const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  const port = parseInt(val, 10); // eslint-disable-line no-shadow

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string'
    ? `Pipe ${port}`
    : `Port ${port}`;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(chalk.red(bind + ' requires elevated privileges'));
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(chalk.red(bind + ' is already in use'));
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
  console.log('Express is running at: ' + chalk.cyan(protocol + '://' + host + ':' + port + '/'));
  console.log();
}

export default app;
