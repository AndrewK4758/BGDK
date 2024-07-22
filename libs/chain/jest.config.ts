/* eslint-disable */
export default {
  displayName: 'chain',
  preset: '../../jest.preset.js',
  testEnvironment: 'node',
  transform: {
    '^.+\\.[tj]s$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.spec.json' }],
  },
  moduleFileExtensions: ['ts', 'js', 'html','mts'],
  coverageDirectory: '../../coverage/libs/chain',
};
