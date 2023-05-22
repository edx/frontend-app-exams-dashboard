const path = require('path');
const { createConfig } = require('@edx/frontend-build');

const config = createConfig('webpack-dev');

config.resolve.modules = [
  path.resolve(__dirname, './src'),
  'node_modules',
];

module.exports = config;
