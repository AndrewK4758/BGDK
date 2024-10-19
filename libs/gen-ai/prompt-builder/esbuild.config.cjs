module.exports = {
  sourcemap: true,
  target: 'node22',
  platform: 'node',
  format: ['esm'],
  bundle: true,
  loader: { '.json': 'text' },
};
//
