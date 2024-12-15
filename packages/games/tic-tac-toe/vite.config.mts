/// <reference types='vitest' />
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import * as path from 'path';
import { cwd } from 'process';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

// These options were migrated by @nx/vite:convert-to-inferred from the project.json file.
const configValues = { default: {} };

// Determine the correct configValue to use based on the configuration
const nxConfiguration = process.env.NX_TASK_TARGET_CONFIGURATION ?? 'default';

const options = {
  ...configValues.default,
  ...(configValues[nxConfiguration] ?? {})
};

export default defineConfig({
  root: __dirname,
  cacheDir: '../../../node_modules/.vite/libs/games/tic-tac-toe',

  plugins: [
    nxViteTsPaths({ debug: true, mainFields: ['exports', '.', 'types', 'import', 'default'] }),
    dts({
      logLevel: 'info',
      outDir: `${cwd()}/dist/libs/games/tic-tac-toe/src`,
      entryRoot: 'src',
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
    outDir: `${cwd()}/dist/libs/games/tic-tac-toe`,
    emptyOutDir: true,
    reportCompressedSize: true,
    commonjsOptions: {
      transformMixedEsModules: true
    },
    lib: {
      // Could also be a dictionary or array of multiple entry points.
      entry: 'src/index.ts',
      name: 'tic-tac-toe',
      fileName: 'index',
      // Change this to the formats you want to support.
      // Don't forget to update your package.json as well.
      formats: ['es', 'cjs']
    },
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
