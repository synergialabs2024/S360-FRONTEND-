import react from '@vitejs/plugin-react-swc';
import path from 'path';
import million from 'million/compiler';
import svgr from '@svgr/rollup';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [million.vite({ auto: true }), svgr(), react()],

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
