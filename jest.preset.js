const nxPreset = require('@nx/jest/preset').nxPreset;

module.exports = {
  ...nxPreset,
  verbose: true,
  collectCoverage: true,
  passWithNoTests: true,
  maxWorkers: 1,
};
