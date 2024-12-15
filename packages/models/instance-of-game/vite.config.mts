/// <reference types='vitest' />
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import * as path from 'path';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import { cwd } from 'process';

export default defineConfig({
  root: __dirname,
  cacheDir: '../../node_modules/.vite/packages/instance-of-game',

  plugins: [
    nxViteTsPaths({ debug: true, mainFields: ['exports', '.', 'types', 'import', 'default'] }),
    dts({
      logLevel: 'info',
      entryRoot: 'src',
      outDir: `${cwd()}/dist/packages/models/instance-of-game/src`,
      tsconfigPath: path.join(__dirname, 'tsconfig.lib.json')
    })
  ],

  // Uncomment this if you are using workers.
  // worker: {
  //  plugins: [ nxViteTsPaths() ],
  // },

  // Configuration for building your library.
  // See: https://vitejs.dev/guide/build.html#library-mode
  build: {
    outDir: `${cwd()}/dist/packages/models/instance-of-game`,
    emptyOutDir: false,
    reportCompressedSize: true,
    commonjsOptions: {
      transformMixedEsModules: true
    },
    lib: {
      // Could also be a dictionary or array of multiple entry points.
      entry: 'src/index.ts',
      name: 'instance-of-game',
      fileName: 'index',
      // Change this to the formats you want to support.
      // Don't forget to update your package.json as well.
      formats: ['es', 'cjs']
    },
    target: 'node23',
    rollupOptions: {
      output: {
        esModule: true,
        format: 'esm'
      },
      // External packages that should not be bundled into your library.
      external: []
    }
  },
  esbuild: {
    format: 'esm',
    color: true,
    platform: 'node'
  },
  logLevel: 'info'
});
