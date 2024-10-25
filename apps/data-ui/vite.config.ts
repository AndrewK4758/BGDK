import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import { nxCopyAssetsPlugin } from '@nx/vite/plugins/nx-copy-assets.plugin';

export default defineConfig({
  test: {
    watch: false,
    globals: true,
    environment: 'jsdom',
    include: ['tests/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    reporters: ['default'],
    coverage: {
      reportsDirectory: '../../coverage/apps/data-ui',
      provider: 'v8',
    },
  },
  root: __dirname,
  cacheDir: '../../node_modules/.vite/apps/data-ui',

  server: {
    port: 5200,
    host: 'localhost',
  },

  preview: {
    port: 5300,
    host: 'localhost',
  },

  plugins: [react({ babel: { targets: { esmodules: true } } }), nxViteTsPaths(), nxCopyAssetsPlugin(['*.md']), react()],

  // Uncomment this if you are using workers.
  // worker: {
  //  plugins: [ nxViteTsPaths() ],
  // },

  build: {
    outDir: '../../dist/apps/data-ui',
    emptyOutDir: true,
    reportCompressedSize: true,
    commonjsOptions: {
      transformMixedEsModules: true,
    },
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
