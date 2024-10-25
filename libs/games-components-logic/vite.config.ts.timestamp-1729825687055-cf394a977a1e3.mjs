// libs/games-components-logic/vite.config.ts
import { defineConfig } from "file:///home/ak475826/Projects/BGDK/node_modules/.pnpm/vite@5.4.10_@types+node@22.7.9_less@4.1.3_sass@1.80.4_stylus@0.59.0_terser@5.36.0/node_modules/vite/dist/node/index.js";
import dts from "file:///home/ak475826/Projects/BGDK/node_modules/.pnpm/vite-plugin-dts@4.3.0_@types+node@22.7.9_rollup@4.24.0_typescript@5.6.3_vite@5.4.10_@types+no_bkefyzmjrie2hhkmfhdqlio7za/node_modules/vite-plugin-dts/dist/index.mjs";
import * as path from "path";
import { nxViteTsPaths } from "file:///home/ak475826/Projects/BGDK/node_modules/.pnpm/@nx+vite@20.0.5_@babel+traverse@7.25.9_@swc-node+register@1.10.9_@swc+core@1.7.39_@swc+helper_f4zjgn7p5yungnciqhntbncxhm/node_modules/@nx/vite/plugins/nx-tsconfig-paths.plugin.js";
var __vite_injected_original_dirname = "/home/ak475826/Projects/BGDK/libs/games-components-logic";
var vite_config_default = defineConfig({
  root: __vite_injected_original_dirname,
  cacheDir: "../../node_modules/.vite/libs/games-components-logic",
  plugins: [nxViteTsPaths(), dts({ entryRoot: "src", tsconfigPath: path.join(__vite_injected_original_dirname, "tsconfig.lib.json") })],
  // Uncomment this if you are using workers.
  // worker: {
  //  plugins: [ nxViteTsPaths() ],
  // },
  // Configuration for building your library.
  // See: https://vitejs.dev/guide/build.html#library-mode
  build: {
    outDir: "../../dist/libs/games-components-logic",
    emptyOutDir: true,
    reportCompressedSize: true,
    commonjsOptions: {
      transformMixedEsModules: true
    },
    lib: {
      // Could also be a dictionary or array of multiple entry points.
      entry: "src/index.ts",
      name: "games-components-logic",
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsibGlicy9nYW1lcy1jb21wb25lbnRzLWxvZ2ljL3ZpdGUuY29uZmlnLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiL2hvbWUvYWs0NzU4MjYvUHJvamVjdHMvQkdESy9saWJzL2dhbWVzLWNvbXBvbmVudHMtbG9naWNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9ob21lL2FrNDc1ODI2L1Byb2plY3RzL0JHREsvbGlicy9nYW1lcy1jb21wb25lbnRzLWxvZ2ljL3ZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9ob21lL2FrNDc1ODI2L1Byb2plY3RzL0JHREsvbGlicy9nYW1lcy1jb21wb25lbnRzLWxvZ2ljL3ZpdGUuY29uZmlnLnRzXCI7Ly8vIDxyZWZlcmVuY2UgdHlwZXM9J3ZpdGVzdCcgLz5cbmltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3ZpdGUnO1xuaW1wb3J0IGR0cyBmcm9tICd2aXRlLXBsdWdpbi1kdHMnO1xuaW1wb3J0ICogYXMgcGF0aCBmcm9tICdwYXRoJztcbmltcG9ydCB7IG54Vml0ZVRzUGF0aHMgfSBmcm9tICdAbngvdml0ZS9wbHVnaW5zL254LXRzY29uZmlnLXBhdGhzLnBsdWdpbic7XG5cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIHJvb3Q6IF9fZGlybmFtZSxcbiAgY2FjaGVEaXI6ICcuLi8uLi9ub2RlX21vZHVsZXMvLnZpdGUvbGlicy9nYW1lcy1jb21wb25lbnRzLWxvZ2ljJyxcblxuICBwbHVnaW5zOiBbbnhWaXRlVHNQYXRocygpLCBkdHMoeyBlbnRyeVJvb3Q6ICdzcmMnLCB0c2NvbmZpZ1BhdGg6IHBhdGguam9pbihfX2Rpcm5hbWUsICd0c2NvbmZpZy5saWIuanNvbicpIH0pXSxcblxuICAvLyBVbmNvbW1lbnQgdGhpcyBpZiB5b3UgYXJlIHVzaW5nIHdvcmtlcnMuXG4gIC8vIHdvcmtlcjoge1xuICAvLyAgcGx1Z2luczogWyBueFZpdGVUc1BhdGhzKCkgXSxcbiAgLy8gfSxcblxuICAvLyBDb25maWd1cmF0aW9uIGZvciBidWlsZGluZyB5b3VyIGxpYnJhcnkuXG4gIC8vIFNlZTogaHR0cHM6Ly92aXRlanMuZGV2L2d1aWRlL2J1aWxkLmh0bWwjbGlicmFyeS1tb2RlXG4gIGJ1aWxkOiB7XG4gICAgb3V0RGlyOiAnLi4vLi4vZGlzdC9saWJzL2dhbWVzLWNvbXBvbmVudHMtbG9naWMnLFxuICAgIGVtcHR5T3V0RGlyOiB0cnVlLFxuICAgIHJlcG9ydENvbXByZXNzZWRTaXplOiB0cnVlLFxuICAgIGNvbW1vbmpzT3B0aW9uczoge1xuICAgICAgdHJhbnNmb3JtTWl4ZWRFc01vZHVsZXM6IHRydWUsXG4gICAgfSxcbiAgICBsaWI6IHtcbiAgICAgIC8vIENvdWxkIGFsc28gYmUgYSBkaWN0aW9uYXJ5IG9yIGFycmF5IG9mIG11bHRpcGxlIGVudHJ5IHBvaW50cy5cbiAgICAgIGVudHJ5OiAnc3JjL2luZGV4LnRzJyxcbiAgICAgIG5hbWU6ICdnYW1lcy1jb21wb25lbnRzLWxvZ2ljJyxcbiAgICAgIGZpbGVOYW1lOiAnaW5kZXgnLFxuICAgICAgLy8gQ2hhbmdlIHRoaXMgdG8gdGhlIGZvcm1hdHMgeW91IHdhbnQgdG8gc3VwcG9ydC5cbiAgICAgIC8vIERvbid0IGZvcmdldCB0byB1cGRhdGUgeW91ciBwYWNrYWdlLmpzb24gYXMgd2VsbC5cbiAgICAgIGZvcm1hdHM6IFsnZXMnLCAnY2pzJ10sXG4gICAgfSxcbiAgICByb2xsdXBPcHRpb25zOiB7XG4gICAgICAvLyBFeHRlcm5hbCBwYWNrYWdlcyB0aGF0IHNob3VsZCBub3QgYmUgYnVuZGxlZCBpbnRvIHlvdXIgbGlicmFyeS5cbiAgICAgIGV4dGVybmFsOiBbXSxcbiAgICB9LFxuICB9LFxufSk7XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQ0EsU0FBUyxvQkFBb0I7QUFDN0IsT0FBTyxTQUFTO0FBQ2hCLFlBQVksVUFBVTtBQUN0QixTQUFTLHFCQUFxQjtBQUo5QixJQUFNLG1DQUFtQztBQU16QyxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixNQUFNO0FBQUEsRUFDTixVQUFVO0FBQUEsRUFFVixTQUFTLENBQUMsY0FBYyxHQUFHLElBQUksRUFBRSxXQUFXLE9BQU8sY0FBbUIsVUFBSyxrQ0FBVyxtQkFBbUIsRUFBRSxDQUFDLENBQUM7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxFQVM3RyxPQUFPO0FBQUEsSUFDTCxRQUFRO0FBQUEsSUFDUixhQUFhO0FBQUEsSUFDYixzQkFBc0I7QUFBQSxJQUN0QixpQkFBaUI7QUFBQSxNQUNmLHlCQUF5QjtBQUFBLElBQzNCO0FBQUEsSUFDQSxLQUFLO0FBQUE7QUFBQSxNQUVILE9BQU87QUFBQSxNQUNQLE1BQU07QUFBQSxNQUNOLFVBQVU7QUFBQTtBQUFBO0FBQUEsTUFHVixTQUFTLENBQUMsTUFBTSxLQUFLO0FBQUEsSUFDdkI7QUFBQSxJQUNBLGVBQWU7QUFBQTtBQUFBLE1BRWIsVUFBVSxDQUFDO0FBQUEsSUFDYjtBQUFBLEVBQ0Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
