// vite.config.ts
import react from "file:///workspaces/barebones-nodejs/code/01_erp/02_modernizer/node_modules/.pnpm/@vitejs+plugin-react-swc@3.7.1_vite@5.4.9_@types+node@22.7.8_/node_modules/@vitejs/plugin-react-swc/index.mjs";
import path from "path";
import million from "file:///workspaces/barebones-nodejs/code/01_erp/02_modernizer/node_modules/.pnpm/million@3.1.11_rollup@4.24.0/node_modules/million/dist/packages/compiler.mjs";
import svgr from "file:///workspaces/barebones-nodejs/code/01_erp/02_modernizer/node_modules/.pnpm/@svgr+rollup@8.1.0_rollup@4.24.0_typescript@5.6.3/node_modules/@svgr/rollup/dist/index.js";
import { defineConfig } from "file:///workspaces/barebones-nodejs/code/01_erp/02_modernizer/node_modules/.pnpm/vite@5.4.9_@types+node@22.7.8/node_modules/vite/dist/node/index.js";
var __vite_injected_original_dirname = "/workspaces/barebones-nodejs/code/01_erp/02_modernizer";
var vite_config_default = defineConfig({
  plugins: [million.vite({ auto: true }), svgr(), react()],
  resolve: {
    alias: {
      "@": path.resolve(__vite_injected_original_dirname, "./src")
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvd29ya3NwYWNlcy9iYXJlYm9uZXMtbm9kZWpzL2NvZGUvMDFfZXJwLzAyX21vZGVybml6ZXJcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi93b3Jrc3BhY2VzL2JhcmVib25lcy1ub2RlanMvY29kZS8wMV9lcnAvMDJfbW9kZXJuaXplci92aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vd29ya3NwYWNlcy9iYXJlYm9uZXMtbm9kZWpzL2NvZGUvMDFfZXJwLzAyX21vZGVybml6ZXIvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgcmVhY3QgZnJvbSAnQHZpdGVqcy9wbHVnaW4tcmVhY3Qtc3djJztcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnO1xuaW1wb3J0IG1pbGxpb24gZnJvbSAnbWlsbGlvbi9jb21waWxlcic7XG5pbXBvcnQgc3ZnciBmcm9tICdAc3Znci9yb2xsdXAnO1xuaW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSc7XG5cbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICBwbHVnaW5zOiBbbWlsbGlvbi52aXRlKHsgYXV0bzogdHJ1ZSB9KSwgc3ZncigpLCByZWFjdCgpXSxcblxuICByZXNvbHZlOiB7XG4gICAgYWxpYXM6IHtcbiAgICAgICdAJzogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJy4vc3JjJyksXG4gICAgfSxcbiAgfSxcbn0pOyJdLAogICJtYXBwaW5ncyI6ICI7QUFBb1YsT0FBTyxXQUFXO0FBQ3RXLE9BQU8sVUFBVTtBQUNqQixPQUFPLGFBQWE7QUFDcEIsT0FBTyxVQUFVO0FBQ2pCLFNBQVMsb0JBQW9CO0FBSjdCLElBQU0sbUNBQW1DO0FBT3pDLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLFNBQVMsQ0FBQyxRQUFRLEtBQUssRUFBRSxNQUFNLEtBQUssQ0FBQyxHQUFHLEtBQUssR0FBRyxNQUFNLENBQUM7QUFBQSxFQUV2RCxTQUFTO0FBQUEsSUFDUCxPQUFPO0FBQUEsTUFDTCxLQUFLLEtBQUssUUFBUSxrQ0FBVyxPQUFPO0FBQUEsSUFDdEM7QUFBQSxFQUNGO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
