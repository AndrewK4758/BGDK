import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import * as path from 'path';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import { nxCopyAssetsPlugin } from '@nx/vite/plugins/nx-copy-assets.plugin';
import { cwd } from 'process';

export default defineConfig({
  test: {
    watch: false,
    globals: true,
    environment: 'jsdom',
    include: ['tests/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    reporters: ['verbose'],
    coverage: {
      reportsDirectory: '../../coverage/libs/react-components',
      provider: 'v8'
    }
  },
  root: __dirname,
  cacheDir: '../../node_modules/.vite/libs/react-components',

  plugins: [
    react({ babel: { targets: { esmodules: true } } }),
    nxViteTsPaths({ debug: true, mainFields: ['exports', '.', 'types', 'imports', 'require'] }),
    nxCopyAssetsPlugin(['*.md']),
    dts({
      logLevel: 'info',
      entryRoot: 'src',
      outDir: `${cwd()}/dist/libs/react-components/src`,
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
    outDir: `${cwd()}/dist/libs/react-components`,
    emptyOutDir: true,
    reportCompressedSize: true,
    commonjsOptions: {
      transformMixedEsModules: true
    },
    lib: {
      // Could also be a dictionary or array of multiple entry points.
      entry: 'src/index.ts',
      name: 'react-components',
      fileName: 'index',
      // Change this to the formats you want to support.
      // Don't forget to update your package.json as well.
      formats: ['es', 'cjs']
    },

    rollupOptions: {
      // External packages that should not be bundled into your library.
      external: ['react', 'react-dom', 'react/jsx-runtime'],
      perf: true,
      output: {
        esModule: true,
        format: 'esm',
        generatedCode: {
          arrowFunctions: true,
          constBindings: true,
          symbols: true
        }
      }
    },
    target: 'esnext'
  },
  esbuild: {
    format: 'esm',
    color: true,
    platform: 'browser'
  },
  logLevel: 'info'
});
