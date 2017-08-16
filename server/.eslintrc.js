module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module',
  },
  extends: 'airbnb',
  env: {
    browser: true,
    jest: true,
    node: true,
  },
  // add your custom rules here
  rules: {
    // allow paren-less arrow functions
    'arrow-parens': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    'max-len': 0,
    'no-console': 0,
    'no-unused-vars': 1,
    'no-mixed-operators': [
      'error',
      {
        'allowSamePrecedence': true,
      }
    ],
    'import/no-named-as-default': 0,
  },
};
