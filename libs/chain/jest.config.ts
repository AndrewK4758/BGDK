import { DefaultEsmTransformOptions } from 'ts-jest';

const opts: Partial<DefaultEsmTransformOptions> = {
  diagnostics: {
    pretty: true,
    warnOnly: true,
  },
  tsconfig: '<rootDir>/tsconfig.spec.json',
};

export default {
  displayName: 'chain',
  preset: '../../jest.preset.js',
  testEnvironment: 'node',
  transform: {
    '^.+\\.[tj]s$': ['ts-jest', opts],
  },
  extensionsToTreatAsEsm: ['.jsx', '.ts', '.tsx', '.mts'],
  moduleFileExtensions: ['ts', 'js', 'html', 'mts'],
  coverageDirectory: '../../coverage/libs/chain',
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },
};
