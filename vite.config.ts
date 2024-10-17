import react from '@vitejs/plugin-react-swc';
import MillionLint from '@million/lint';
import path from 'path';
import svgr from '@svgr/rollup';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [MillionLint.vite(),,svgr(), react()],

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});