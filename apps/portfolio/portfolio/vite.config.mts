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

  plugins: [react(), nxViteTsPaths(), nxCopyAssetsPlugin(['*.md'])],

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
      transformMixedEsModules: true,
    },
    assetsDir: './assets',
    rollupOptions: {
      perf: true,
      output: {
        esModule: true,
        format: 'esm',
      },
    },
  },
  esbuild: {
    format: 'esm',
    color: true,
    platform: 'browser',
    target: 'esnext',
  },
  appType: 'spa',
  publicDir: 'public',
  envDir: './env',
});
