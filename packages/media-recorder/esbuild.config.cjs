const { cwd } = require('process');
const build = require('esbuild').buildSync;

build({
  sourceRoot: `${__dirname}/src`,
  color: true,
  metafile: true,
  sourcemap: true,
  target: 'esnext',
  platform: 'browser',
  format: 'esm',
  bundle: true,
  write: true,
  outdir: `${cwd()}/dist/packages/media-recorder`
});
