import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import http from 'http';
import chalk from 'chalk';

import cache from './routes/cache';
import bugsHistoryRoute from './routes/bugsHistory';
import newRelicRoute from './routes/newRelic';
import jiraRoute from './routes/jira';
import financeRoute from './routes/finance';
import loggerMiddleware from './middleware/loggerMiddleware';
import triviaRoute from './routes/trivia';

const app = express();
const ROUTE_PREFIX = '/api';

app.use((req, res, next) => {
  loggerMiddleware.accessLog(req, res, next);
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// CORS middleware
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET');
  res.header('Access-Control-Allow-Headers', 'Content-Type');

  next();
});

// cache endpoints
app.use(`${ROUTE_PREFIX}/cache`, cache);

// widget endpoints
app.use(`${ROUTE_PREFIX}/bugsHistory`, bugsHistoryRoute);
app.use(`${ROUTE_PREFIX}/finance`, financeRoute);
app.use(`${ROUTE_PREFIX}/newRelic`, newRelicRoute);
app.use(`${ROUTE_PREFIX}/jira`, jiraRoute);
app.use(`${ROUTE_PREFIX}/trivia`, triviaRoute);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => {  // eslint-disable-line no-unused-vars
  loggerMiddleware.errorLog(err, req, res);
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
