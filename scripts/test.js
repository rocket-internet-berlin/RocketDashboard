'use strict';

process.env.NODE_ENV = 'test';
process.env.PUBLIC_URL = '';

// Load environment variables from .env file. Suppress warnings using silent
// if this file is missing. dotenv will never modify any environment variables
// that have already been set.
// https://github.com/motdotla/dotenv
// require('dotenv').config({ silent: true });
// No need for the above line as we shouldn't be loading config values from file for unit tests. Eric 1 Sep 2017

const jest = require('jest');
const argv = process.argv.slice(2);

jest.run(argv);
