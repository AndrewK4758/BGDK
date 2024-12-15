const { cwd } = require('process');
const build = require('esbuild').buildSync;

build({
  sourceRoot: `${__dirname}/src`,
  color: true,
  metafile: true,
  sourcemap: 'linked',
  target: 'esnext',
  format: 'esm',
  platform: 'node',
  bundle: true,
  write: true,
  outdir: `${cwd()}/dist/packages/gen-ai/vertex-ai`
});
