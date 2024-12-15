const { cwd } = require('process');
const build = require('esbuild').buildSync;

build({
  sourceRoot: `${__dirname}/src`,
  color: true,
  metafile: true,
  sourcemap: true,
  target: 'node23',
  platform: 'node',
  format: 'esm',
  bundle: true,
  write: true,
  outdir: `${cwd()}/dist/apis/vertex-api`
});
