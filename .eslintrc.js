// eslint-disable-next-line import/no-extraneous-dependencies
const { createConfig } = require('@openedx/frontend-build');

const config = createConfig('eslint');

config.settings = {
  'import/resolver': {
    node: {
      paths: ['src', 'node_modules'],
      extensions: ['.js', '.jsx'],
    },
  },
};

module.exports = config;
