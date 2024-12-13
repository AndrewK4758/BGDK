import { nxCopyAssetsPlugin } from '@nx/vite/plugins/nx-copy-assets.plugin';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import react from '@vitejs/plugin-react';
import { cwd } from 'process';
import { defineConfig, type ViteUserConfig } from 'vitest/config';

const vite: ViteUserConfig = defineConfig({
  test: {
    watch: false,
    globals: true,
    environment: 'jsdom',
    include: ['tests/**.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    reporters: ['verbose'],
    logHeapUsage: true,
    name: 'Portfolio',
    coverage: {
      reportsDirectory: `${cwd()}/coverage/apps/portfolio/portfolio`,
      provider: 'v8'
    }
  },
  root: __dirname,
  cacheDir: '../../../node_modules/.vite/apps/portfolio/portfolio',

  server: {
    port: 4700,
    host: 'localhost'
  },

  preview: {
    port: 4800,
    host: 'localhost'
  },

  plugins: [react(), nxViteTsPaths(), nxCopyAssetsPlugin(['*.md'])],

  // Uncomment this if you are using workers.
  // worker: {
  // format: 'es',
  // plugins: [nxViteTsPaths()]
  // },

  css: {
    devSourcemap: true,
    modules: { exportGlobals: true }
  },

  build: {
    outDir: 'dist',
    manifest: true,
    emptyOutDir: true,
    sourcemap: false,
    reportCompressedSize: true,
    commonjsOptions: {
      transformMixedEsModules: true
    },
    target: 'esnext',
    assetsDir: './assets',
    minify: false,

    rollupOptions: {
      perf: true,

      output: {
        esModule: true,
        format: 'es',
        generatedCode: {
          arrowFunctions: true,
          constBindings: true,
          symbols: true,
          objectShorthand: true
        }
      }
    }
  },

  logLevel: 'info',
  appType: 'spa',
  publicDir: 'public',
  envDir: './env',

  esbuild: {
    jsx: 'automatic',
    format: 'esm',
    color: true,
    platform: 'browser',
    sourcemap: true,
    target: 'esnext'
  }
});

export default vite;
