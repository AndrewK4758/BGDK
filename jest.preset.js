import nxPreset from '@nx/jest/preset.js';

export default {
  ...nxPreset,
  modulePaths: ['<rootDir>/__mocks__/*', '<rootDir>/node_modules/*'],
  verbose: true,
  collectCoverage: true,
  passWithNoTests: true,
  maxWorkers: 2,
  modulelNameMapper: {
    '@bgdk/all-games-map': '<rootDir>/libs/models/all-games-map',
  },
};
