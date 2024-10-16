 
export default {
  displayName: 'games-api',
  preset: '../../../jest.preset.js',
  testEnvironment: 'node',
  transform: {
    '^.+\\.[tj]s$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.spec.json', useESM: true }],
  },
  moduleFileExtensions: ['ts', 'js', 'html', 'mts'],
  coverageDirectory: '../../../coverage/apis/games-api/games-api',
};
