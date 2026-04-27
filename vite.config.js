import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const rootPath = path.dirname(fileURLToPath(import.meta.url));
const srcPath = path.resolve(rootPath, 'src');

export default defineConfig({
  base: './',
  plugins: [
    react({
      include: /\.(js|jsx)$/,
    }),
  ],
  resolve: {
    alias: {
      components: path.resolve(srcPath, 'components'),
      services: path.resolve(srcPath, 'services'),
      store: path.resolve(srcPath, 'store'),
      styles: path.resolve(srcPath, 'styles'),
      utils: path.resolve(srcPath, 'utils'),
    },
  },
  build: {
    target: 'esnext',
    minify: 'esbuild',
    rollupOptions: {
      output: {
        manualChunks: undefined, // ensure single chunk for extension if preferred, or rely on vite default
      },
    },
  },
  esbuild: {
    drop: ['console', 'debugger'],
  },
  test: {
    environment: 'jsdom',
    setupFiles: './src/setupTests.js',
    globals: true,
    include: ['src/**/*.spec.js'],
  },
});
