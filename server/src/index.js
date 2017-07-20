import express from 'express';
import path from 'path';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import http from 'http';
import chalk from 'chalk';

import cache from './routes/cache';
import bugsHistory from './routes/bugsHistory';
import newRelic from './routes/newRelic';
import jiraIssues from './routes/jiraIssues';

const app = express();
const ROUTE_PREFIX = '/api';

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// cache endpoints
app.use(`${ROUTE_PREFIX}/cache`, cache);

// widget endpoints
app.use(`${ROUTE_PREFIX}/bugsHistory`, bugsHistory);
app.use(`${ROUTE_PREFIX}/newRelic`, newRelic);
app.use(`${ROUTE_PREFIX}/jiraIssues`, jiraIssues);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err.message : {};

  if (req.app.get('env') === 'development') {
    console.error(err.stack);
  }

  // render the error page
  res.status(err.status || 500);
  res.send({
    status: 'error',
    message: 'Something went terribly wrong!',
    error: res.locals.error,
  });
});

/**
 * Get port from environment and store in Express.
 */

const port = normalizePort(process.env.PORT || '3001'); // eslint-disable-line no-use-before-define
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
server.on('error', onError);  // eslint-disable-line no-use-before-define
server.on('listening', onListening);  // eslint-disable-line no-use-before-define

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
      console.error(chalk.red(`${bind} requires elevated privileges`));
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(chalk.red(`${bind} is already in use`));
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
  console.log(`Express is running at: ${chalk.cyan(`${protocol}://${host}:${port}/`)}`);
  console.log();
}

export default app;
