module.exports = {
  sourcemap: true,
  target: 'node22',
  platform: 'node',
  format: 'esm',
  bundle: true,
  minify: process.env.NODE_ENV === 'production',
  external: ['express'],
};
