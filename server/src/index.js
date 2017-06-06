import express from 'express';
import path from 'path';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import http from 'http';
import chalk from 'chalk';

import weekNumber from './routes/weekNumber';
import bugsDiff from './routes/bugsDiff';
import bugsHistory from './routes/bugsHistory';

const app = express();
const ROUTE_PREFIX = '/api';

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(ROUTE_PREFIX + '/weekNumber', weekNumber);
app.use(ROUTE_PREFIX + '/bugsDiff', bugsDiff);
app.use(ROUTE_PREFIX + '/bugsHistory', bugsHistory);

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
    "status": "error",
    "message": "Something went terribly wrong!"
  });
});

/**
 * Get port from environment and store in Express.
 */

var port = normalizePort(process.env.PORT || '3001');
app.set('port', port);

var protocol = process.env.HTTPS === 'true' ? "https" : "http";
var host = process.env.HOST || 'localhost';

console.log(chalk.cyan('Starting the Express server...'));

/**
 * Create HTTP server.
 */

var server = http.createServer(app);

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
  var port = parseInt(val, 10);

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

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

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
