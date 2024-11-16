/// <reference types='vitest' />
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import * as path from 'path';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';

export default defineConfig({
  root: __dirname,
  cacheDir: '../../node_modules/.vite/libs/chain',

  plugins: [
    nxViteTsPaths({
      buildLibsFromSource: true,
      debug: true,
      mainFields: ['exports', '.', 'types', 'import', 'require'],
    }),
    dts({
      logLevel: 'info',
      entryRoot: 'src',
      tsconfigPath: path.join(__dirname, 'tsconfig.lib.json'),
    }),
  ],

  // Uncomment this if you are using workers.
  // worker: {
  //  plugins: [ nxViteTsPaths({}) ],
  // },

  // Configuration for building your library.
  // See: https://vitejs.dev/guide/build.html#library-mode
  build: {
    outDir: './dist',
    emptyOutDir: true,
    reportCompressedSize: true,
    commonjsOptions: {
      transformMixedEsModules: true,
    },
    target: 'esnext',
    lib: {
      // Could also be a dictionary or array of multiple entry points.
      entry: 'src/index.ts',
      name: 'chain',
      fileName: 'main',
      // Change this to the formats you want to support.
      // Don't forget to update your package.json as well.
      formats: ['es', 'cjs'],
    },
    rollupOptions: {
      output: {
        esModule: true,
        format: 'esm',
      },
      // External packages that should not be bundled into your library.
      external: [],
    },
  },
  esbuild: {
    format: 'esm',
    color: true,
    platform: 'node',
    target: 'node23',
  },
  logLevel: 'info',
});
