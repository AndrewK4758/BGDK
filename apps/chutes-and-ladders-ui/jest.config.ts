/* eslint-disable */
export default {
  displayName: 'chutes-and-ladders-ui',
  preset: '../../jest.preset.js',
  transform: {
    '^(?!.*\\.(js|jsx|ts|tsx|css|json)$)': '@nx/react/plugins/jest',
    '^.+\\.[tj]sx?$': ['babel-jest', { presets: ['@nx/react/babel'] }],
  },

  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'mts'],
  coverageDirectory: '../../coverage/apps/chutes-and-ladders-ui',
};
