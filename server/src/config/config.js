/* eslint import/no-dynamic-require: 0 */
const config = require(`./config.${process.env.NODE_ENV}`);

export const spreadsheetID = () => (config.default.spreadsheetID);
export const clientAccountEmail = () => (config.default.clientAccountEmail);
export const clientAccountPrivateKey = () => (config.default.clientAccountPrivateKey);

export default config;
