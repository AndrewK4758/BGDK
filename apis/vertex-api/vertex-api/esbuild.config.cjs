module.exports = {
  sourcemap: 'linked',
  target: 'node23',
  format: ['esm'],
  platform: 'node',
  bundle: true,
  loader: {
    '.node': 'empty'
  },
  external: ['node-pty']
};
