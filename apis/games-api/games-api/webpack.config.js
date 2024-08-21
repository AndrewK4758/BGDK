const NxAppWebpackPlugin = require('@nx/webpack/app-plugin').NxAppWebpackPlugin;
const join = require('path').join;

module.exports = {
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  output: {
    path: join(__dirname, '../../../dist/apis/games-api'),
    filename: 'main.js',
  },
  watch: process.env.NODE_ENV === 'development' ? true : false,
  node: {
    __dirname: true,
    __filename: true,
  },
  experiments: {
    topLevelAwait: true,
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
      progress: true,
      watch: true,
      verbose: true,
    }),
  ],
};
