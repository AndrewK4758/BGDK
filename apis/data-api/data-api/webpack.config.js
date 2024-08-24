const { NxAppWebpackPlugin } = require('@nx/webpack/app-plugin');

const { join } = require('path');

module.exports = {
  output: {
    path: join(__dirname, '../../../dist/apis/data-api'),
  },
  watch: process.env.NODE_ENV === 'production' ? false : true,
  plugins: [
    new NxAppWebpackPlugin({
      target: 'node',
      compiler: 'tsc',
      main: './src/main.ts',
      tsConfig: './tsconfig.app.json',
      assets: ['./src/assets'],
      optimization: false,
      outputHashing: 'none',
      progress: true,
      watch: true,
      verbose: true,
    }),
  ],
};
