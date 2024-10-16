const esbuildPluginTsc = require('esbuild-plugin-tsc');

module.exports = {
  sourcemap: true,
  plugins: [
    esbuildPluginTsc({
      tsconfigPath: './apis/data-api/data-api/tsconfig.app.json',
    }),
  ],
  outExtension: {
    '.js': '.js',
  },
  resolveExtensions: ['.ts', '.js'],
  target: 'esnext',
  platform: 'node',
  format: ['esm'],
  bundle: true,
};
//
