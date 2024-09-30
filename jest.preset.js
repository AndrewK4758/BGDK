const { transform } = require('typescript');

const nxPreset = require('@nx/jest/preset').default;

module.exports = {
  ...nxPreset,

  modulePaths: ['<rootDir>/__mocks__/*'],
  verbose: true,
  collectCoverage: true,
  passWithNoTests: true,
  maxWorkers: 2,
};
