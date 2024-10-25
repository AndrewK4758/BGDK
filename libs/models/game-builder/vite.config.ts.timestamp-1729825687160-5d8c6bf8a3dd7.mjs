// libs/models/game-builder/vite.config.ts
import { defineConfig } from "file:///home/ak475826/Projects/BGDK/node_modules/.pnpm/vite@5.4.10_@types+node@22.7.9_less@4.1.3_sass@1.80.4_stylus@0.59.0_terser@5.36.0/node_modules/vite/dist/node/index.js";
import dts from "file:///home/ak475826/Projects/BGDK/node_modules/.pnpm/vite-plugin-dts@4.3.0_@types+node@22.7.9_rollup@4.24.0_typescript@5.6.3_vite@5.4.10_@types+no_bkefyzmjrie2hhkmfhdqlio7za/node_modules/vite-plugin-dts/dist/index.mjs";
import * as path from "path";
import { nxViteTsPaths } from "file:///home/ak475826/Projects/BGDK/node_modules/.pnpm/@nx+vite@20.0.5_@babel+traverse@7.25.9_@swc-node+register@1.10.9_@swc+core@1.7.39_@swc+helper_f4zjgn7p5yungnciqhntbncxhm/node_modules/@nx/vite/plugins/nx-tsconfig-paths.plugin.js";
var __vite_injected_original_dirname = "/home/ak475826/Projects/BGDK/libs/models/game-builder";
var vite_config_default = defineConfig({
  root: __vite_injected_original_dirname,
  cacheDir: "../../../node_modules/.vite/libs/models/game-builder",
  plugins: [
    nxViteTsPaths(),
    dts({
      entryRoot: "src",
      tsconfigPath: path.join(__vite_injected_original_dirname, "tsconfig.lib.json")
    })
  ],
  // Uncomment this if you are using workers.
  // worker: {
  //  plugins: [ nxViteTsPaths() ],
  // },
  // Configuration for building your library.
  // See: https://vitejs.dev/guide/build.html#library-mode
  build: {
    outDir: "../../../dist/libs/models/game-builder",
    emptyOutDir: true,
    reportCompressedSize: true,
    commonjsOptions: {
      transformMixedEsModules: true
    },
    lib: {
      // Could also be a dictionary or array of multiple entry points.
      entry: "src/index.ts",
      name: "game-builder",
      fileName: "index",
      // Change this to the formats you want to support.
      // Don't forget to update your package.json as well.
      formats: ["es", "cjs"]
    },
    target: "esnext",
    rollupOptions: {
      output: {
        esModule: true,
        format: "esm"
      },
      // External packages that should not be bundled into your library.
      external: []
    }
  },
  esbuild: {
    format: "esm",
    color: true,
    platform: "node"
  },
  logLevel: "info"
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsibGlicy9tb2RlbHMvZ2FtZS1idWlsZGVyL3ZpdGUuY29uZmlnLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiL2hvbWUvYWs0NzU4MjYvUHJvamVjdHMvQkdESy9saWJzL21vZGVscy9nYW1lLWJ1aWxkZXJcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9ob21lL2FrNDc1ODI2L1Byb2plY3RzL0JHREsvbGlicy9tb2RlbHMvZ2FtZS1idWlsZGVyL3ZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9ob21lL2FrNDc1ODI2L1Byb2plY3RzL0JHREsvbGlicy9tb2RlbHMvZ2FtZS1idWlsZGVyL3ZpdGUuY29uZmlnLnRzXCI7Ly8vIDxyZWZlcmVuY2UgdHlwZXM9J3ZpdGVzdCcgLz5cbmltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3ZpdGUnO1xuaW1wb3J0IGR0cyBmcm9tICd2aXRlLXBsdWdpbi1kdHMnO1xuaW1wb3J0ICogYXMgcGF0aCBmcm9tICdwYXRoJztcbmltcG9ydCB7IG54Vml0ZVRzUGF0aHMgfSBmcm9tICdAbngvdml0ZS9wbHVnaW5zL254LXRzY29uZmlnLXBhdGhzLnBsdWdpbic7XG5cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIHJvb3Q6IF9fZGlybmFtZSxcbiAgY2FjaGVEaXI6ICcuLi8uLi8uLi9ub2RlX21vZHVsZXMvLnZpdGUvbGlicy9tb2RlbHMvZ2FtZS1idWlsZGVyJyxcblxuICBwbHVnaW5zOiBbXG4gICAgbnhWaXRlVHNQYXRocygpLFxuICAgIGR0cyh7XG4gICAgICBlbnRyeVJvb3Q6ICdzcmMnLFxuICAgICAgdHNjb25maWdQYXRoOiBwYXRoLmpvaW4oX19kaXJuYW1lLCAndHNjb25maWcubGliLmpzb24nKSxcbiAgICB9KSxcbiAgXSxcblxuICAvLyBVbmNvbW1lbnQgdGhpcyBpZiB5b3UgYXJlIHVzaW5nIHdvcmtlcnMuXG4gIC8vIHdvcmtlcjoge1xuICAvLyAgcGx1Z2luczogWyBueFZpdGVUc1BhdGhzKCkgXSxcbiAgLy8gfSxcblxuICAvLyBDb25maWd1cmF0aW9uIGZvciBidWlsZGluZyB5b3VyIGxpYnJhcnkuXG4gIC8vIFNlZTogaHR0cHM6Ly92aXRlanMuZGV2L2d1aWRlL2J1aWxkLmh0bWwjbGlicmFyeS1tb2RlXG4gIGJ1aWxkOiB7XG4gICAgb3V0RGlyOiAnLi4vLi4vLi4vZGlzdC9saWJzL21vZGVscy9nYW1lLWJ1aWxkZXInLFxuICAgIGVtcHR5T3V0RGlyOiB0cnVlLFxuICAgIHJlcG9ydENvbXByZXNzZWRTaXplOiB0cnVlLFxuICAgIGNvbW1vbmpzT3B0aW9uczoge1xuICAgICAgdHJhbnNmb3JtTWl4ZWRFc01vZHVsZXM6IHRydWUsXG4gICAgfSxcbiAgICBsaWI6IHtcbiAgICAgIC8vIENvdWxkIGFsc28gYmUgYSBkaWN0aW9uYXJ5IG9yIGFycmF5IG9mIG11bHRpcGxlIGVudHJ5IHBvaW50cy5cbiAgICAgIGVudHJ5OiAnc3JjL2luZGV4LnRzJyxcbiAgICAgIG5hbWU6ICdnYW1lLWJ1aWxkZXInLFxuICAgICAgZmlsZU5hbWU6ICdpbmRleCcsXG4gICAgICAvLyBDaGFuZ2UgdGhpcyB0byB0aGUgZm9ybWF0cyB5b3Ugd2FudCB0byBzdXBwb3J0LlxuICAgICAgLy8gRG9uJ3QgZm9yZ2V0IHRvIHVwZGF0ZSB5b3VyIHBhY2thZ2UuanNvbiBhcyB3ZWxsLlxuICAgICAgZm9ybWF0czogWydlcycsICdjanMnXSxcbiAgICB9LFxuICAgIHRhcmdldDogJ2VzbmV4dCcsXG4gICAgcm9sbHVwT3B0aW9uczoge1xuICAgICAgb3V0cHV0OiB7XG4gICAgICAgIGVzTW9kdWxlOiB0cnVlLFxuICAgICAgICBmb3JtYXQ6ICdlc20nLFxuICAgICAgfSxcbiAgICAgIC8vIEV4dGVybmFsIHBhY2thZ2VzIHRoYXQgc2hvdWxkIG5vdCBiZSBidW5kbGVkIGludG8geW91ciBsaWJyYXJ5LlxuICAgICAgZXh0ZXJuYWw6IFtdLFxuICAgIH0sXG4gIH0sXG4gIGVzYnVpbGQ6IHtcbiAgICBmb3JtYXQ6ICdlc20nLFxuICAgIGNvbG9yOiB0cnVlLFxuICAgIHBsYXRmb3JtOiAnbm9kZScsXG4gIH0sXG4gIGxvZ0xldmVsOiAnaW5mbycsXG59KTtcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFDQSxTQUFTLG9CQUFvQjtBQUM3QixPQUFPLFNBQVM7QUFDaEIsWUFBWSxVQUFVO0FBQ3RCLFNBQVMscUJBQXFCO0FBSjlCLElBQU0sbUNBQW1DO0FBTXpDLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLE1BQU07QUFBQSxFQUNOLFVBQVU7QUFBQSxFQUVWLFNBQVM7QUFBQSxJQUNQLGNBQWM7QUFBQSxJQUNkLElBQUk7QUFBQSxNQUNGLFdBQVc7QUFBQSxNQUNYLGNBQW1CLFVBQUssa0NBQVcsbUJBQW1CO0FBQUEsSUFDeEQsQ0FBQztBQUFBLEVBQ0g7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxFQVNBLE9BQU87QUFBQSxJQUNMLFFBQVE7QUFBQSxJQUNSLGFBQWE7QUFBQSxJQUNiLHNCQUFzQjtBQUFBLElBQ3RCLGlCQUFpQjtBQUFBLE1BQ2YseUJBQXlCO0FBQUEsSUFDM0I7QUFBQSxJQUNBLEtBQUs7QUFBQTtBQUFBLE1BRUgsT0FBTztBQUFBLE1BQ1AsTUFBTTtBQUFBLE1BQ04sVUFBVTtBQUFBO0FBQUE7QUFBQSxNQUdWLFNBQVMsQ0FBQyxNQUFNLEtBQUs7QUFBQSxJQUN2QjtBQUFBLElBQ0EsUUFBUTtBQUFBLElBQ1IsZUFBZTtBQUFBLE1BQ2IsUUFBUTtBQUFBLFFBQ04sVUFBVTtBQUFBLFFBQ1YsUUFBUTtBQUFBLE1BQ1Y7QUFBQTtBQUFBLE1BRUEsVUFBVSxDQUFDO0FBQUEsSUFDYjtBQUFBLEVBQ0Y7QUFBQSxFQUNBLFNBQVM7QUFBQSxJQUNQLFFBQVE7QUFBQSxJQUNSLE9BQU87QUFBQSxJQUNQLFVBQVU7QUFBQSxFQUNaO0FBQUEsRUFDQSxVQUFVO0FBQ1osQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
