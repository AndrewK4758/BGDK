const { NxAppWebpackPlugin } = require('@nx/webpack/app-plugin');
const { join } = require('path');

module.exports = {
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  output: {
    path: join(__dirname, '../../../dist/apis/data-api'),
    filename: 'main.js',
    module: true,
    chunkFormat: 'module',
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
      dynamicImportInWorker: true,
      // The environment supports 'for of' iteration ('for (const x of array) { ... }').
      forOf: true,
      // The environment supports 'globalThis'.
      globalThis: true,
      // The environment supports ECMAScript Module syntax to import ECMAScript modules (import ... from '...').
      module: true,
      // Determines if the node: prefix is generated for core module imports in environments that support it.
      // This is only applicable to Webpack runtime code.
      nodePrefixForCoreModules: true,
      // The environment supports optional chaining ('obj?.a' or 'obj?.()').
      optionalChaining: true,
      // The environment supports template literals.
      templateLiteral: true,
    },
  },
  watch: process.env.NODE_ENV === 'development' ? true : false,

  experiments: {
    topLevelAwait: true,
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
