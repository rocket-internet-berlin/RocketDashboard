import fs from 'fs';
import morgan from 'morgan';
import path from 'path';
import rfs from 'rotating-file-stream';
import chalk from 'chalk';

class LoggerMiddleware {
  constructor() {
    const logDirectory = path.join(__dirname, '..', '..', 'logs');

    // ensure log directory exists
    if (!fs.existsSync(logDirectory)) {
      fs.mkdirSync(logDirectory);
    }

    if (process.env.NODE_ENV === 'production') {
      // create a rotating write stream
      const accessLogStream = rfs('access.log', {
        interval: '1d', // rotate daily
        path: logDirectory,
      });

      const errorLogStream = rfs('error.log', {
        interval: '1d',
        path: logDirectory,
      });

      this.accessLogger = morgan('combined', { stream: accessLogStream });
      this.errorLogger = { stream: errorLogStream };
    } else {
      this.accessLogger = morgan('combined');
      this.errorLogger = { stream: process.stdout, formatter: chalk.red };
    }
  }

  accessLog(req, res, next) {
    this.accessLogger(req, res, next);
  }

  errorLog(err, req, res) {
    this.log(err);

    res.status(err.status || 500);
    res.send({
      status: 'error',
      message: 'Something went terribly wrong!',
      error: req.app.get('env') !== 'production' ? err.message : {},
    });
  }

  log(err) {
    const date = (new Date()).toString();
    let msg = `${date} ${err.stack} \n`;

    if (this.errorLogger.formatter) {
      msg = this.errorLogger.formatter(msg);
    }

    this.errorLogger.stream.write(msg);
  }
}

const loggerMiddleware = new LoggerMiddleware();

export default loggerMiddleware;
