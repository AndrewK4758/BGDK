// libs/chain/vite.config.ts
import { defineConfig } from "file:///home/ak475826/Projects/BGDK/node_modules/.pnpm/vite@5.4.10_@types+node@22.7.9_less@4.1.3_sass@1.80.4_stylus@0.59.0_terser@5.36.0/node_modules/vite/dist/node/index.js";
import dts from "file:///home/ak475826/Projects/BGDK/node_modules/.pnpm/vite-plugin-dts@4.3.0_@types+node@22.7.9_rollup@4.24.0_typescript@5.6.3_vite@5.4.10_@types+no_bkefyzmjrie2hhkmfhdqlio7za/node_modules/vite-plugin-dts/dist/index.mjs";
import * as path from "path";
import { nxViteTsPaths } from "file:///home/ak475826/Projects/BGDK/node_modules/.pnpm/@nx+vite@20.0.5_@babel+traverse@7.25.9_@swc-node+register@1.10.9_@swc+core@1.7.39_@swc+helper_f4zjgn7p5yungnciqhntbncxhm/node_modules/@nx/vite/plugins/nx-tsconfig-paths.plugin.js";
var __vite_injected_original_dirname = "/home/ak475826/Projects/BGDK/libs/chain";
var vite_config_default = defineConfig({
  root: __vite_injected_original_dirname,
  cacheDir: "../../node_modules/.vite/libs/chain",
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
    outDir: "./dist",
    emptyOutDir: true,
    reportCompressedSize: true,
    commonjsOptions: {
      transformMixedEsModules: true
    },
    target: "esnext",
    lib: {
      // Could also be a dictionary or array of multiple entry points.
      entry: "src/index.ts",
      name: "chain",
      fileName: "index",
      // Change this to the formats you want to support.
      // Don't forget to update your package.json as well.
      formats: ["es", "cjs"]
    },
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsibGlicy9jaGFpbi92aXRlLmNvbmZpZy50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIi9ob21lL2FrNDc1ODI2L1Byb2plY3RzL0JHREsvbGlicy9jaGFpblwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL2hvbWUvYWs0NzU4MjYvUHJvamVjdHMvQkdESy9saWJzL2NoYWluL3ZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9ob21lL2FrNDc1ODI2L1Byb2plY3RzL0JHREsvbGlicy9jaGFpbi92aXRlLmNvbmZpZy50c1wiOy8vLyA8cmVmZXJlbmNlIHR5cGVzPSd2aXRlc3QnIC8+XG5pbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJztcbmltcG9ydCBkdHMgZnJvbSAndml0ZS1wbHVnaW4tZHRzJztcbmltcG9ydCAqIGFzIHBhdGggZnJvbSAncGF0aCc7XG5pbXBvcnQgeyBueFZpdGVUc1BhdGhzIH0gZnJvbSAnQG54L3ZpdGUvcGx1Z2lucy9ueC10c2NvbmZpZy1wYXRocy5wbHVnaW4nO1xuXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICByb290OiBfX2Rpcm5hbWUsXG4gIGNhY2hlRGlyOiAnLi4vLi4vbm9kZV9tb2R1bGVzLy52aXRlL2xpYnMvY2hhaW4nLFxuXG4gIHBsdWdpbnM6IFtcbiAgICBueFZpdGVUc1BhdGhzKCksXG4gICAgZHRzKHtcbiAgICAgIGVudHJ5Um9vdDogJ3NyYycsXG4gICAgICB0c2NvbmZpZ1BhdGg6IHBhdGguam9pbihfX2Rpcm5hbWUsICd0c2NvbmZpZy5saWIuanNvbicpLFxuICAgIH0pLFxuICBdLFxuXG4gIC8vIFVuY29tbWVudCB0aGlzIGlmIHlvdSBhcmUgdXNpbmcgd29ya2Vycy5cbiAgLy8gd29ya2VyOiB7XG4gIC8vICBwbHVnaW5zOiBbIG54Vml0ZVRzUGF0aHMoKSBdLFxuICAvLyB9LFxuXG4gIC8vIENvbmZpZ3VyYXRpb24gZm9yIGJ1aWxkaW5nIHlvdXIgbGlicmFyeS5cbiAgLy8gU2VlOiBodHRwczovL3ZpdGVqcy5kZXYvZ3VpZGUvYnVpbGQuaHRtbCNsaWJyYXJ5LW1vZGVcbiAgYnVpbGQ6IHtcbiAgICBvdXREaXI6ICcuL2Rpc3QnLFxuICAgIGVtcHR5T3V0RGlyOiB0cnVlLFxuICAgIHJlcG9ydENvbXByZXNzZWRTaXplOiB0cnVlLFxuICAgIGNvbW1vbmpzT3B0aW9uczoge1xuICAgICAgdHJhbnNmb3JtTWl4ZWRFc01vZHVsZXM6IHRydWUsXG4gICAgfSxcbiAgICB0YXJnZXQ6ICdlc25leHQnLFxuICAgIGxpYjoge1xuICAgICAgLy8gQ291bGQgYWxzbyBiZSBhIGRpY3Rpb25hcnkgb3IgYXJyYXkgb2YgbXVsdGlwbGUgZW50cnkgcG9pbnRzLlxuICAgICAgZW50cnk6ICdzcmMvaW5kZXgudHMnLFxuICAgICAgbmFtZTogJ2NoYWluJyxcbiAgICAgIGZpbGVOYW1lOiAnaW5kZXgnLFxuICAgICAgLy8gQ2hhbmdlIHRoaXMgdG8gdGhlIGZvcm1hdHMgeW91IHdhbnQgdG8gc3VwcG9ydC5cbiAgICAgIC8vIERvbid0IGZvcmdldCB0byB1cGRhdGUgeW91ciBwYWNrYWdlLmpzb24gYXMgd2VsbC5cbiAgICAgIGZvcm1hdHM6IFsnZXMnLCAnY2pzJ10sXG4gICAgfSxcbiAgICByb2xsdXBPcHRpb25zOiB7XG4gICAgICBvdXRwdXQ6IHtcbiAgICAgICAgZXNNb2R1bGU6IHRydWUsXG4gICAgICAgIGZvcm1hdDogJ2VzbScsXG4gICAgICB9LFxuICAgICAgLy8gRXh0ZXJuYWwgcGFja2FnZXMgdGhhdCBzaG91bGQgbm90IGJlIGJ1bmRsZWQgaW50byB5b3VyIGxpYnJhcnkuXG4gICAgICBleHRlcm5hbDogW10sXG4gICAgfSxcbiAgfSxcbiAgZXNidWlsZDoge1xuICAgIGZvcm1hdDogJ2VzbScsXG4gICAgY29sb3I6IHRydWUsXG4gICAgcGxhdGZvcm06ICdub2RlJyxcbiAgfSxcbiAgbG9nTGV2ZWw6ICdpbmZvJyxcbn0pO1xuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUNBLFNBQVMsb0JBQW9CO0FBQzdCLE9BQU8sU0FBUztBQUNoQixZQUFZLFVBQVU7QUFDdEIsU0FBUyxxQkFBcUI7QUFKOUIsSUFBTSxtQ0FBbUM7QUFNekMsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsTUFBTTtBQUFBLEVBQ04sVUFBVTtBQUFBLEVBRVYsU0FBUztBQUFBLElBQ1AsY0FBYztBQUFBLElBQ2QsSUFBSTtBQUFBLE1BQ0YsV0FBVztBQUFBLE1BQ1gsY0FBbUIsVUFBSyxrQ0FBVyxtQkFBbUI7QUFBQSxJQUN4RCxDQUFDO0FBQUEsRUFDSDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEVBU0EsT0FBTztBQUFBLElBQ0wsUUFBUTtBQUFBLElBQ1IsYUFBYTtBQUFBLElBQ2Isc0JBQXNCO0FBQUEsSUFDdEIsaUJBQWlCO0FBQUEsTUFDZix5QkFBeUI7QUFBQSxJQUMzQjtBQUFBLElBQ0EsUUFBUTtBQUFBLElBQ1IsS0FBSztBQUFBO0FBQUEsTUFFSCxPQUFPO0FBQUEsTUFDUCxNQUFNO0FBQUEsTUFDTixVQUFVO0FBQUE7QUFBQTtBQUFBLE1BR1YsU0FBUyxDQUFDLE1BQU0sS0FBSztBQUFBLElBQ3ZCO0FBQUEsSUFDQSxlQUFlO0FBQUEsTUFDYixRQUFRO0FBQUEsUUFDTixVQUFVO0FBQUEsUUFDVixRQUFRO0FBQUEsTUFDVjtBQUFBO0FBQUEsTUFFQSxVQUFVLENBQUM7QUFBQSxJQUNiO0FBQUEsRUFDRjtBQUFBLEVBQ0EsU0FBUztBQUFBLElBQ1AsUUFBUTtBQUFBLElBQ1IsT0FBTztBQUFBLElBQ1AsVUFBVTtBQUFBLEVBQ1o7QUFBQSxFQUNBLFVBQVU7QUFDWixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
