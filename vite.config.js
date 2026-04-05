import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const rootPath = path.dirname(fileURLToPath(import.meta.url));
const srcPath = path.resolve(rootPath, 'src');

export default defineConfig({
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
  test: {
    environment: 'jsdom',
    setupFiles: './src/setupTests.js',
    globals: true,
    include: ['src/**/*.spec.js'],
  },
});
