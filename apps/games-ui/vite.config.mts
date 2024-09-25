/// <reference types="vite/client" />
/// <reference types='vitest' />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import { nxCopyAssetsPlugin } from '@nx/vite/plugins/nx-copy-assets.plugin';

export default defineConfig({
  root: __dirname,
  cacheDir: '../../node_modules/.vite/apps/games-ui',

  server: {
    port: 4200,
    host: 'localhost',
  },

  preview: {
    port: 4300,
    host: 'localhost',
  },

  plugins: [react(), nxViteTsPaths(), nxCopyAssetsPlugin(['*.md'])],

  // Uncomment this if you are using workers.
  // worker: {
  //  plugins: [ nxViteTsPaths() ],
  // },

  build: {
    outDir: '../../dist/apps/games-ui',
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
      },
    },
    target: 'esnext',
  },
  esbuild: {
    format: 'esm',
    color: true,
    platform: 'browser',
  },
  logLevel: 'info',
  appType: 'spa',
  envDir: './env',
});
