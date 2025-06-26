// Include below line for test configuration
/// <reference types="vitest" />
import path from 'path';
import tailwindcss from '@tailwindcss/vite';
import { TanStackRouterVite } from '@tanstack/router-plugin/vite';
import react from '@vitejs/plugin-react';
import { defineConfig, type PluginOption } from 'vite';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
  plugins: [
    TanStackRouterVite({
      target: 'react',
      autoCodeSplitting: true,
    }) as PluginOption,
    tailwindcss(),
    react(),
    svgr(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/tests/vitest/setup.ts',
    include: ['./src/tests/vitest/*.test.{ts,tsx}'],
    exclude: ['node_modules', 'dist'],
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:4000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '/api'),
      },
      '/auth': {
        target: 'http://localhost:4000',
        changeOrigin: true,
      },
      '/socket.io': {
        target: 'http://localhost:4000',
        ws: true,
        changeOrigin: true,
      },
    },
  },
});
