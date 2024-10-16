// babel.config.js
module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: { node: 'current' },
        bugfixes: true, // Only apply necessary transforms
      },
    ],
    '@babel/preset-typescript',
    '@babel/preset-react', // If you're using React
  ],
  env: {
    // Specific configuration for the test environment
    test: {
      presets: [
        [
          '@babel/preset-env',
          {
            targets: { node: 'current' },
            modules: 'commonjs', // Transform ESM to CommonJS for Jest
          },
        ],
      ],
    },
  },
};
