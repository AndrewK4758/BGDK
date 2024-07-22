/* eslint-disable */

export default {
  displayName: 'chutes-and-ladders',
  preset: '../../jest.preset.js',
  testEnvironment: 'node',
  transform: {
    '^.+\\.[tj]s$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.spec.json' }],
  },
  moduleFileExtensions: ['ts', 'js', 'html', 'mts'],
  coverageDirectory: '../../coverage/libs/chutes-and-ladders',
  moduleNameMapper: {
    '@mocks': '<rootDir>/__mocks__/*.ts',
  },
};
