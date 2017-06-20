/* eslint import/no-dynamic-require: 0 */
import defaultsDeep from 'lodash/defaultsDeep';

const configDefault = require('./config.default');
const configEnv = require('./config.env');

const config = defaultsDeep(configEnv, configDefault);

export default config;
