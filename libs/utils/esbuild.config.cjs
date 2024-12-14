const { cwd } = require('process');
const build = require('esbuild').buildSync;

build({
  sourceRoot: `${__dirname}/src`,
  color: true,
  metafile: true,
  sourcemap: 'linked',
  target: 'esnext',
  platform: 'node',
  bundle: true,
  write: true,
  outdir: `${cwd()}/dist/libs/utils`
});
