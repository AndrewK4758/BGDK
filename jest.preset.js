const nxPreset = require('@nx/jest/preset').default;

module.exports = {
  ...nxPreset,
  verbose: true,
  collectCoverage: true,
  passWithNoTests: true,
  maxWorkers: 1,
};
