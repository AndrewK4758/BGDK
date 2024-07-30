const nxPreset = require('@nx/jest/preset').default;
const path = require('path');
module.exports = {
  ...nxPreset,
  testEnvironmentOptions: {},
  modulePaths: ['<rootDir>/__mocks__'],
  verbose: true,
  clearMocks: true,
};
