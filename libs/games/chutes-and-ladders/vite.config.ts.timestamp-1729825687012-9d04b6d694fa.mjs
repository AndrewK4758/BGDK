// libs/games/chutes-and-ladders/vite.config.ts
import { defineConfig } from "file:///home/ak475826/Projects/BGDK/node_modules/.pnpm/vite@5.4.10_@types+node@22.7.9_less@4.1.3_sass@1.80.4_stylus@0.59.0_terser@5.36.0/node_modules/vite/dist/node/index.js";
import dts from "file:///home/ak475826/Projects/BGDK/node_modules/.pnpm/vite-plugin-dts@4.3.0_@types+node@22.7.9_rollup@4.24.0_typescript@5.6.3_vite@5.4.10_@types+no_bkefyzmjrie2hhkmfhdqlio7za/node_modules/vite-plugin-dts/dist/index.mjs";
import * as path from "path";
import { nxViteTsPaths } from "file:///home/ak475826/Projects/BGDK/node_modules/.pnpm/@nx+vite@20.0.5_@babel+traverse@7.25.9_@swc-node+register@1.10.9_@swc+core@1.7.39_@swc+helper_f4zjgn7p5yungnciqhntbncxhm/node_modules/@nx/vite/plugins/nx-tsconfig-paths.plugin.js";
var __vite_injected_original_dirname = "/home/ak475826/Projects/BGDK/libs/games/chutes-and-ladders";
var vite_config_default = defineConfig({
  root: __vite_injected_original_dirname,
  cacheDir: "../../node_modules/.vite/libs/chutes-and-ladders",
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
    outDir: "../../dist/libs/chutes-and-ladders",
    emptyOutDir: true,
    reportCompressedSize: true,
    commonjsOptions: {
      transformMixedEsModules: true
    },
    target: "modules",
    lib: {
      // Could also be a dictionary or array of multiple entry points.
      entry: "src/index.ts",
      name: "chutes-and-ladders",
      fileName: "index",
      // Change this to the formats you want to support.
      // Don't forget to update your package.json as well.
      formats: ["es", "cjs"]
    },
    rollupOptions: {
      // External packages that should not be bundled into your library.
      external: []
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsibGlicy9nYW1lcy9jaHV0ZXMtYW5kLWxhZGRlcnMvdml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvaG9tZS9hazQ3NTgyNi9Qcm9qZWN0cy9CR0RLL2xpYnMvZ2FtZXMvY2h1dGVzLWFuZC1sYWRkZXJzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvaG9tZS9hazQ3NTgyNi9Qcm9qZWN0cy9CR0RLL2xpYnMvZ2FtZXMvY2h1dGVzLWFuZC1sYWRkZXJzL3ZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9ob21lL2FrNDc1ODI2L1Byb2plY3RzL0JHREsvbGlicy9nYW1lcy9jaHV0ZXMtYW5kLWxhZGRlcnMvdml0ZS5jb25maWcudHNcIjsvLy8gPHJlZmVyZW5jZSB0eXBlcz0ndml0ZXN0JyAvPlxuaW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSc7XG5pbXBvcnQgZHRzIGZyb20gJ3ZpdGUtcGx1Z2luLWR0cyc7XG5pbXBvcnQgKiBhcyBwYXRoIGZyb20gJ3BhdGgnO1xuaW1wb3J0IHsgbnhWaXRlVHNQYXRocyB9IGZyb20gJ0BueC92aXRlL3BsdWdpbnMvbngtdHNjb25maWctcGF0aHMucGx1Z2luJztcblxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgcm9vdDogX19kaXJuYW1lLFxuICBjYWNoZURpcjogJy4uLy4uL25vZGVfbW9kdWxlcy8udml0ZS9saWJzL2NodXRlcy1hbmQtbGFkZGVycycsXG5cbiAgcGx1Z2luczogW1xuICAgIG54Vml0ZVRzUGF0aHMoKSxcbiAgICBkdHMoe1xuICAgICAgZW50cnlSb290OiAnc3JjJyxcbiAgICAgIHRzY29uZmlnUGF0aDogcGF0aC5qb2luKF9fZGlybmFtZSwgJ3RzY29uZmlnLmxpYi5qc29uJyksXG4gICAgfSksXG4gIF0sXG5cbiAgLy8gVW5jb21tZW50IHRoaXMgaWYgeW91IGFyZSB1c2luZyB3b3JrZXJzLlxuICAvLyB3b3JrZXI6IHtcbiAgLy8gIHBsdWdpbnM6IFsgbnhWaXRlVHNQYXRocygpIF0sXG4gIC8vIH0sXG5cbiAgLy8gQ29uZmlndXJhdGlvbiBmb3IgYnVpbGRpbmcgeW91ciBsaWJyYXJ5LlxuICAvLyBTZWU6IGh0dHBzOi8vdml0ZWpzLmRldi9ndWlkZS9idWlsZC5odG1sI2xpYnJhcnktbW9kZVxuICBidWlsZDoge1xuICAgIG91dERpcjogJy4uLy4uL2Rpc3QvbGlicy9jaHV0ZXMtYW5kLWxhZGRlcnMnLFxuICAgIGVtcHR5T3V0RGlyOiB0cnVlLFxuICAgIHJlcG9ydENvbXByZXNzZWRTaXplOiB0cnVlLFxuICAgIGNvbW1vbmpzT3B0aW9uczoge1xuICAgICAgdHJhbnNmb3JtTWl4ZWRFc01vZHVsZXM6IHRydWUsXG4gICAgfSxcblxuICAgIHRhcmdldDogJ21vZHVsZXMnLFxuICAgIGxpYjoge1xuICAgICAgLy8gQ291bGQgYWxzbyBiZSBhIGRpY3Rpb25hcnkgb3IgYXJyYXkgb2YgbXVsdGlwbGUgZW50cnkgcG9pbnRzLlxuICAgICAgZW50cnk6ICdzcmMvaW5kZXgudHMnLFxuICAgICAgbmFtZTogJ2NodXRlcy1hbmQtbGFkZGVycycsXG4gICAgICBmaWxlTmFtZTogJ2luZGV4JyxcbiAgICAgIC8vIENoYW5nZSB0aGlzIHRvIHRoZSBmb3JtYXRzIHlvdSB3YW50IHRvIHN1cHBvcnQuXG4gICAgICAvLyBEb24ndCBmb3JnZXQgdG8gdXBkYXRlIHlvdXIgcGFja2FnZS5qc29uIGFzIHdlbGwuXG4gICAgICBmb3JtYXRzOiBbJ2VzJywgJ2NqcyddLFxuICAgIH0sXG4gICAgcm9sbHVwT3B0aW9uczoge1xuICAgICAgLy8gRXh0ZXJuYWwgcGFja2FnZXMgdGhhdCBzaG91bGQgbm90IGJlIGJ1bmRsZWQgaW50byB5b3VyIGxpYnJhcnkuXG4gICAgICBleHRlcm5hbDogW10sXG4gICAgfSxcbiAgfSxcbn0pO1xuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUNBLFNBQVMsb0JBQW9CO0FBQzdCLE9BQU8sU0FBUztBQUNoQixZQUFZLFVBQVU7QUFDdEIsU0FBUyxxQkFBcUI7QUFKOUIsSUFBTSxtQ0FBbUM7QUFNekMsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsTUFBTTtBQUFBLEVBQ04sVUFBVTtBQUFBLEVBRVYsU0FBUztBQUFBLElBQ1AsY0FBYztBQUFBLElBQ2QsSUFBSTtBQUFBLE1BQ0YsV0FBVztBQUFBLE1BQ1gsY0FBbUIsVUFBSyxrQ0FBVyxtQkFBbUI7QUFBQSxJQUN4RCxDQUFDO0FBQUEsRUFDSDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEVBU0EsT0FBTztBQUFBLElBQ0wsUUFBUTtBQUFBLElBQ1IsYUFBYTtBQUFBLElBQ2Isc0JBQXNCO0FBQUEsSUFDdEIsaUJBQWlCO0FBQUEsTUFDZix5QkFBeUI7QUFBQSxJQUMzQjtBQUFBLElBRUEsUUFBUTtBQUFBLElBQ1IsS0FBSztBQUFBO0FBQUEsTUFFSCxPQUFPO0FBQUEsTUFDUCxNQUFNO0FBQUEsTUFDTixVQUFVO0FBQUE7QUFBQTtBQUFBLE1BR1YsU0FBUyxDQUFDLE1BQU0sS0FBSztBQUFBLElBQ3ZCO0FBQUEsSUFDQSxlQUFlO0FBQUE7QUFBQSxNQUViLFVBQVUsQ0FBQztBQUFBLElBQ2I7QUFBQSxFQUNGO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
