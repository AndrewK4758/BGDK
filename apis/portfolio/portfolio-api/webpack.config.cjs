const { NxAppWebpackPlugin } = require('@nx/webpack/app-plugin');
const { join } = require('path');

module.exports = {
  output: {
    path: join(__dirname, '../../../dist/apis/portfolio-api'),
    filename: 'main.js',
  },
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',

  watch: process.env.NODE_ENV === 'development' ? true : false,
  node: {
    __dirname: true,
    __filename: true,
  },
  experiments: {
    topLevelAwait: true,
  },
  resolve: {
    conditionNames: ['import', 'require', 'node', 'default'],
    extensions: ['.ts', '.js'],
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
