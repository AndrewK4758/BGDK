export default {
  displayName: 'chains-for-games',
  preset: '../../jest.preset.js',
  testEnvironment: 'node',
  transform: {
    '^.+\\.[tj]s$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.spec.json', useESM: true }],
  },
  moduleFileExtensions: ['ts', 'js', 'html', 'mts'],
  coverageDirectory: '../../coverage/libs/chains-for-games',
};
