import { defineConfig } from 'vite';
import { resolve } from 'node:path';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [
    react(),
    dts({ entryRoot: 'src/lib', exclude: ['**/*.spec.*', '**/*.stories.tsx'] }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/lib/index.ts'),
      formats: ['es'],
      name: 'vite-react-lib',
      fileName: (format) => `index.${format}.js`,
    },
    copyPublicDir: false,
    minify: false,
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime'],
      output: {
        entryFileNames: '[name].js',
      },
    },
  },
});
