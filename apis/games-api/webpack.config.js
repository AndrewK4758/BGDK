const { NxAppWebpackPlugin } = require('@nx/webpack/app-plugin');
const { join } = require('path');

module.exports = {
  output: {
    path: join(__dirname, '../../dist/apis/games-api'),
  },
  target: 'async-node',
  plugins: [
    new NxAppWebpackPlugin({
      compiler: 'tsc',
      main: './src/main.ts',
      tsConfig: './tsconfig.app.json',
      assets: ['./src/assets'],
      outputHashing: false,
      progress: true,
    }),
  ],
};
