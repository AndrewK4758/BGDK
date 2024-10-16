const nxPreset = require('@nx/jest/preset').nxPreset;

module.exports = {
  ...nxPreset,
  modulePaths: ['<rootDir>/__mocks__/mocks.ts', '<rootDir>/node_modules/*'],
  verbose: true,
  collectCoverage: true,
  passWithNoTests: true,
  maxWorkers: 2,
};
