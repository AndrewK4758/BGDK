const { NxAppWebpackPlugin } = require('@nx/webpack/app-plugin');
const { rules } = require('eslint-config-prettier');
const { join } = require('path');

module.exports = {
  output: {
    path: join(__dirname, '../../../dist/apis/portfolio-api'),
    filename: 'main.js',
    module: true,
    library: {
      type: 'module',
    },
    chunkFormat: 'module',
    scriptType: 'module',
    environment: {
      // The environment supports arrow functions ('() => { ... }').
      arrowFunction: true,
      // The environment supports async function and await ('async function () { await ... }').
      asyncFunction: true,
      // The environment supports BigInt as literal (123n).
      // bigIntLiteral: true,
      // The environment supports const and let for variable declarations.
      const: true,
      // The environment supports destructuring ('{ a, b } = obj').
      destructuring: true,
      // The environment supports 'document' variable.
      // document: true,
      // The environment supports an async import() function to import EcmaScript modules.
      dynamicImport: true,
      // The environment supports an async import() when creating a worker, only for web targets at the moment.

      forOf: true,
      // The environment supports 'globalThis'.

      module: true,
    },
  },

  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',

  watch: process.env.NODE_ENV === 'development' ? true : false,

  experiments: {
    outputModule: true,
  },
  plugins: [
    new NxAppWebpackPlugin({
      target: 'node',
      compiler: 'tsc',
      main: './src/main.ts',
      tsConfig: './tsconfig.app.json',
      assets: ['./src/assets'],
      optimization: false,
      outputHashing: 'none',
      generatePackageJson: true,
      progress: true,
      watch: true,
      verbose: true,
      commonChunk: true,
    }),
  ],
};
