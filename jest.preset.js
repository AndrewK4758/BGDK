const nxPreset = require('@nx/jest/preset').default;

module.exports = {
  ...nxPreset,
  modulePaths: ['<rootDir>/__mocks__/*'],
  passWithNoTests: true,
  verbose: true,
  ci: true,
  collectCoverage: true,
};
