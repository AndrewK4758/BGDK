import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import { nxCopyAssetsPlugin } from '@nx/vite/plugins/nx-copy-assets.plugin';
import { createRequire } from 'module';
import path from 'path';
import { cwd } from 'process';

const { resolve } = createRequire(import.meta.url);

const prismaClient = `prisma${path.sep}client`;

const prismaClientIndexBrowser = resolve('@prisma/client/index-browser').replace(
  `@${prismaClient}`,
  `.${prismaClient}`,
);

export default defineConfig({
  test: {
    watch: false,
    globals: true,
    environment: 'jsdom',
    include: ['tests/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    reporters: ['default'],
    coverage: {
      reportsDirectory: '../../../coverage/apps/portfolio/portfolio',
      provider: 'v8',
    },
  },
  root: __dirname,
  cacheDir: '../../../node_modules/.vite/apps/portfolio/portfolio',

  server: {
    port: 4700,
    host: 'localhost',
  },

  preview: {
    port: 4800,
    host: 'localhost',
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
    outDir: './dist',
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

  resolve: { alias: { '.prisma/client/index-browser': path.relative(cwd(), prismaClientIndexBrowser) } },
});
