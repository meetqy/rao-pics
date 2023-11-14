/// <reference types="vitest" />
import path from 'path';
import { defineConfig } from 'vite';

module.exports = defineConfig({
  base: './',
  build: {
    lib: {
      entry: path.resolve(__dirname, './index.ts'),
      name: 'electron-trpc',
      formats: ['es', 'cjs'],
      fileName: (format) => ({ es: 'main.mjs', cjs: 'main.cjs' }[format as 'es' | 'cjs']),
    },
    outDir: path.resolve(__dirname, '../../dist'),
    rollupOptions: {
      external: ['electron'],
    },
  },
});
