module.exports = {
  sourcemap: true,
  target: 'node23',
  platform: 'node',
  format: ['esm', 'cjs'],
  bundle: true,
  write: true,
  outExtension: { '.mjs': '.js', '.cjs': '.cjs' },
  conditions: ['node', 'import'],
};
//
