const esbuildPluginTsc = require('esbuild-plugin-tsc');

module.exports = {
  sourcemap: true,
  plugins: [
    esbuildPluginTsc({
      tsconfigPath: './apis/games-api/games-api/tsconfig.app.json',
    }),
  ],
  outExtension: {
    '.js': '.js',
  },
  target: 'esnext',
  platform: 'node',
  format: ['esm'],
  bundle: true,
};
//
