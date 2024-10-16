/* eslint-disable */
import { Config } from 'jest';

const config: Config = {
  displayName: 'portfolio',
  preset: '../../../jest.preset.js',

  transform: {
    '^(?!.*\\.(js|jsx|ts|tsx|css|json)$)': '@nx/react/plugins/jest',
    '^.+\\.[tj]sx?$': ['babel-jest', { presets: ['@nx/react/babel'] }],
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../../../coverage/apps/portfolio/portfolio',
  transformIgnorePatterns: ['/node_modules/(?!@mui/).*\\.js$'],
};
export default config;

