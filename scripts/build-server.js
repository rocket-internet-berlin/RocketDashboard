'use strict';

// Do this as the first thing so that any code reading it knows the right env.
process.env.NODE_ENV = 'production';

// Load environment variables from .env file. Suppress warnings using silent
// if this file is missing. dotenv will never modify any environment variables
// that have already been set.
// https://github.com/motdotla/dotenv
require('dotenv').config({silent: true});

var chalk = require('chalk');
var fs = require('fs-extra');
var path = require('path');
var url = require('url');
var webpack = require('webpack');
var config = require('../config/webpack.config.server-dev');
var paths = require('../config/paths');
var checkRequiredFiles = require('react-dev-utils/checkRequiredFiles');
var FileSizeReporter = require('react-dev-utils/FileSizeReporter');
var measureFileSizesBeforeBuild = FileSizeReporter.measureFileSizesBeforeBuild;
var printFileSizesAfterBuild = FileSizeReporter.printFileSizesAfterBuild;

var useYarn = fs.existsSync(paths.yarnLockFile);

// Warn and crash if required files are missing
if (!checkRequiredFiles([paths.serverIndexJs])) {
  process.exit(1);
}

// First, read the current file sizes in build directory.
// This lets us display how much they changed later.
measureFileSizesBeforeBuild(paths.serverBuild).then(previousFileSizes => {
  // Remove all content but keep the directory so that
  // if you're in it, you don't end up in Trash
  fs.emptyDirSync(paths.serverBuild);

  // Start the webpack build
  build(previousFileSizes);

  // Merge with the public folder
  // copyPublicFolder();
});

// Print out errors
function printErrors(summary, errors) {
  console.log(chalk.red(summary));
  console.log();
  errors.forEach(err => {
    console.log(err.message || err);
    console.log();
  });
}

// Create the production build and print the deployment instructions.
function build(previousFileSizes) {
  console.log('Creating an optimized production build...');
  webpack(config).run((err, stats) => {
    if (err) {
      printErrors('Failed to compile.', [err]);
      process.exit(1);
    }

    if (stats.compilation.errors.length) {
      printErrors('Failed to compile.', stats.compilation.errors);
      process.exit(1);
    }

    if (process.env.CI && stats.compilation.warnings.length) {
      printErrors('Failed to compile. When process.env.CI = true, warnings are treated as failures. Most CI servers set this automatically.', stats.compilation.warnings);
      process.exit(1);
    }

    console.log(chalk.green('Compiled successfully.'));
    console.log();

    console.log('File sizes after gzip:');
    console.log();
    printFileSizesAfterBuild(stats, previousFileSizes);
    console.log();

  });
}
//
// function copyPublicFolder() {
//   fs.copySync(paths.appPublic, paths.serverBuild, {
//     dereference: true,
//     filter: file => file !== paths.appHtml
//   });
// }
