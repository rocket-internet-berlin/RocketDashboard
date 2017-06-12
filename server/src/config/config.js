/* eslint import/no-dynamic-require: 0 */
import _ from 'lodash';

const configDefault = require('./config.default');

// We go with Node's 'require', rather than 'import', as ES6 spec does neither allow 'import' with string template
// literals nor 'import' inside if-statements.
const configEnv = require(`./config.${process.env.NODE_ENV}`);

const config = _.defaultsDeep(configEnv, configDefault);

export default config;
