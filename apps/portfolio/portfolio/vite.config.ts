/// <reference types="vite/client" />
/// <reference types='vitest' />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import { nxCopyAssetsPlugin } from '@nx/vite/plugins/nx-copy-assets.plugin';

export default defineConfig({
  root: __dirname,
  cacheDir: '../../../node_modules/.vite/apps/portfolio/portfolio',

  server: {
    port: 4700,
    host: 'localhost',
    open: true,
  },

  preview: {
    port: 4800,
    host: 'localhost',
    open: true,
  },

  plugins: [
    react({ babel: { targets: { esmodules: true } } }),
    nxViteTsPaths({
      debug: true,
    }),
    nxCopyAssetsPlugin(['*.md']),
  ],

  // Uncomment this if you are using workers.
  // worker: {
  // format: 'es',
  // plugins: [nxViteTsPaths()]
  // },

  build: {
    outDir: '../../../dist/apps/portfolio',
    emptyOutDir: true,
    reportCompressedSize: true,
    commonjsOptions: {
      transformMixedEsModules: false,
    },

    assetsDir: './assets',
    rollupOptions: {
      perf: true,
      output: {
        esModule: true,
        format: 'esm',
        generatedCode: {
          arrowFunctions: true,
          constBindings: true,
          symbols: true,
        },
      },
    },
    target: 'esnext',
  },
  esbuild: {
    jsx: 'automatic',
    format: 'esm',
    color: true,
    platform: 'browser',
  },
  logLevel: 'info',
  appType: 'spa',
  publicDir: 'public',
  envDir: './env',
});
